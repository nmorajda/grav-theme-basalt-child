const path = require("node:path");
const {
    mkdir,
    readFile,
    readdir,
    rm,
    stat,
    writeFile
} = require("node:fs/promises");
const { parallel, series, watch } = require("gulp");
const sass = require("sass");
const esbuild = require("esbuild");

const root = __dirname;

async function compileStyles(entry, output, options = {}) {
    const result = await sass.compileAsync(
        path.join(root, "src/scss", entry),
        {
            style: "compressed",
            sourceMap: false,
            silenceDeprecations: ["import"],
            ...options
        }
    );

    const destination = path.join(root, "dist/css", output);
    await mkdir(path.dirname(destination), { recursive: true });

    const css = result.css.replace(/^\uFEFF/, "");
    await writeFile(
        destination,
        css.endsWith("\n") ? css : `${css}\n`
    );
}

async function additiveTask() {
    await compileStyles("child.scss", "child.css");
}

async function compiledTask() {
    await compileStyles("compiled.scss", "compiled.css", {
        loadPaths: [
            path.join(root, "node_modules"),
            path.resolve(root, "../basalt/src/scss")
        ],
        quietDeps: true
    });
}

async function stylesTask() {
    await Promise.all([additiveTask(), compiledTask()]);
}

async function bundleVendor(kind, extension, separator) {
    const directory = path.join(root, "src/vendor", kind);
    const output = path.join(
        root,
        `dist/${kind}/child-plugins.${extension}`
    );

    const entries = await readdir(directory, { withFileTypes: true });
    const files = entries
        .filter((entry) =>
            entry.isFile() && entry.name.endsWith(`.${extension}`)
        )
        .map((entry) => entry.name)
        .sort();

    const contents = [];

    for (const file of files) {
        const content = (
            await readFile(path.join(directory, file), "utf8")
        ).replace(/^\uFEFF/, "");
        if (content.trim()) {
            contents.push(content);
        }
    }

    if (!contents.length) {
        await rm(output, { force: true });
        return false;
    }

    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, `${contents.join(separator)}\n`);
    return true;
}

async function childScriptTask() {
    const entry = path.join(root, "src/js/script.js");
    const output = path.join(root, "dist/js/child.js");

    try {
        const source = await stat(entry);
        if (!source.isFile()) {
            throw new Error(`${entry} is not a file`);
        }
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }

        await rm(output, { force: true });
        return false;
    }

    await mkdir(path.dirname(output), { recursive: true });
    await esbuild.build({
        entryPoints: [entry],
        bundle: true,
        outfile: output,
        format: "iife",
        target: ["es2020"],
        minify: true,
        sourcemap: false
    });

    return true;
}

async function assetsTask() {
    const css = await bundleVendor("css", "css", "\n");
    const js = await bundleVendor("js", "js", "\n;\n");
    const script = await childScriptTask();

    await mkdir(path.join(root, "dist"), { recursive: true });
    await writeFile(
        path.join(root, "dist/child-assets.json"),
        JSON.stringify({ css, js, script }) + "\n"
    );
}

const buildTask = parallel(stylesTask, assetsTask);

function watchTask() {
    watch("src/scss/**/*.scss", stylesTask);
    watch("../basalt/src/scss/**/*.scss", compiledTask);
    watch(
        ["src/js/**/*.js", "src/vendor/**/*.{css,js}"],
        assetsTask
    );
}

exports.additive = additiveTask;
exports.compiled = compiledTask;
exports.styles = stylesTask;
exports.assets = assetsTask;
exports.build = buildTask;
exports.watch = watchTask;
exports.default = series(buildTask, watchTask);
