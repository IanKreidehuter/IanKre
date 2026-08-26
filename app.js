// The Learning Archive — shared behaviour
// Vanilla JS only, no dependencies.

(function () {
  "use strict";

  // Folder cards on the home page navigate on click/tap.
  document.querySelectorAll("[data-nav]").forEach(function (el) {
    el.addEventListener("click", function () {
      var href = el.getAttribute("data-nav");
      if (href) window.location.href = href;
    });
    el.setAttribute("role", "link");
    el.setAttribute("tabindex", "0");
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });
})();
