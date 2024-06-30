class OverlayLoader {
    constructor() {
        this.overlay = this.createAndAppendElement("div", "overlay", document.body);
        this.loader = this.createAndAppendElement("div", "loaderCircular", document.body);
    }

    createAndAppendElement(tagName, id, parent) {
        const element = document.createElement(tagName);
        element.id = id;
        parent.appendChild(element);
        return element;
    }

    fadeInElements() {
        this.overlay.style.opacity = "1";
        this.loader.style.opacity = "1";
    }

    fadeOutElements() {
        this.overlay.style.opacity = "0";
        this.loader.style.opacity = "0";
        setTimeout(() => {
            this.overlay.style.display = "none";
            this.loader.style.display = "none";
        }, 300);
    }

    start() {
        this.fadeInElements();
        setTimeout(() => {
            this.fadeOutElements();
        }, 3000);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const overlayLoader = new OverlayLoader();
    overlayLoader.start();
});
