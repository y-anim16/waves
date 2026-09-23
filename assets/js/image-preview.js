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

    const caption = image.closest("figure")?.querySelector("figcaption");

    if (caption) {
        const previewCaption = document.createElement("div");
        previewCaption.className = "image-preview-caption";
        previewCaption.textContent = caption.textContent;

        overlay.appendChild(previewCaption);
    }

    document.body.appendChild(overlay);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.remove();
        }
    });
});