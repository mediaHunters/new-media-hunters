class OverlayLoader {
    constructor() {
        this.overlay = this.createAndAppendElement("div", "overlay", document.body);
        this.loader = this.createAndAppendElement("div", "loaderCircular", document.body);
    }

    createAndAppendElement(tagName, id, parent) {
        const element = document.createElement(tagName);
        element.id = id;
        element.classList.add(id);
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
            document.body.classList.remove("loading");
        }, 300);
    }

    start() {
        this.fadeInElements();
    }
}

// Tworzenie i wyświetlanie loadera najszybciej jak to możliwe
(function() {
    const overlayLoader = new OverlayLoader();
    overlayLoader.start();

    window.addEventListener('load', function() {
        overlayLoader.fadeOutElements();
    });
})();
    