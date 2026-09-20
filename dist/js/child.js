document.addEventListener("DOMContentLoaded", () => {
    const marker = document.querySelector(".child-theme-test");

    if (!marker) {
        return;
    }

    const status = document.createElement("span");
    status.textContent = " Child JavaScript loaded.";
    marker.append(status);
});