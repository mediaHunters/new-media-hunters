import * as pl from "./i18n/pl.js";

document.addEventListener("DOMContentLoaded", () => {
  i18next.init({
    lng: "pl",
    debug: true,
    resources: {
      pl: pl.default,
    },
  });

  const elementsToTranslate = document.querySelectorAll("[data-i18n]");
  elementsToTranslate.forEach((element) => {
    const translationKey = element.dataset.i18n;
    element.textContent = i18next.t(translationKey);
  });
});
