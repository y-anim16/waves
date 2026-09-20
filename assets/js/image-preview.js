document.addEventListener("click", (event) => {
    const image = event.target.closest(".js-preview-image");

    if (!image) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.className = "image-preview-overlay";

    const preview = document.createElement("img");
    preview.src = image.src;
    preview.alt = image.alt;

    overlay.appendChild(preview);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.remove();
        }
    });
});