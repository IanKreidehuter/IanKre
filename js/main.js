(function () {
  "use strict";

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    mobileMenu.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "メニューを開く");
  }

  function openMenu() {
    mobileMenu.hidden = false;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "メニューを閉じる");
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu(); else openMenu();
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------
     Casual content-protection layer
     -----------------------------------------------------------
     This is a deterrent, not a security measure. Anything sent
     to a browser can still be retrieved by someone who knows
     how to use developer tools or view-source. These handlers
     only discourage the casual right-click-and-save path while
     keeping every interactive element fully usable.
     --------------------------------------------------------- */

  var INTERACTIVE_SELECTOR =
    "a, button, input, textarea, select, option, label, [role='button'], [contenteditable='true']";

  function isInteractive(target) {
    return !!(target && target.closest && target.closest(INTERACTIVE_SELECTOR));
  }

  // 1. Disable the context menu, except on interactive elements
  //    (so nothing about link/button behaviour changes).
  document.addEventListener("contextmenu", function (e) {
    if (!isInteractive(e.target)) {
      e.preventDefault();
    }
  });

  // 2. Block the copy/cut of page text. Inputs and textareas are
  //    explicitly excluded so forms keep working normally.
  ["copy", "cut"].forEach(function (evt) {
    document.addEventListener(evt, function (e) {
      if (!isInteractive(e.target)) {
        e.preventDefault();
      }
    });
  });

  // 3. Prevent text selection from starting outside form fields.
  //    (CSS user-select handles most of this already; this is a
  //    backstop for browsers/inputs that ignore it.)
  document.addEventListener("selectstart", function (e) {
    if (!isInteractive(e.target)) {
      e.preventDefault();
    }
  });

  // 4. Prevent images (and the profile/project art specifically)
  //    from being dragged out onto the desktop or another tab.
  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("draggable", "false");
    img.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
  });

  // 5. Block common casual copy/inspect/save keyboard shortcuts.
  //    This never touches Tab, arrow keys, Enter, or Space, so
  //    keyboard navigation of real controls is untouched.
  document.addEventListener("keydown", function (e) {
    var key = (e.key || "").toLowerCase();
    var ctrlOrCmd = e.ctrlKey || e.metaKey;

    // F12 — open dev tools
    if (key === "f12") {
      e.preventDefault();
      return;
    }

    if (!ctrlOrCmd) return;

    // Ctrl/Cmd + S — save page
    // Ctrl/Cmd + U — view source
    // Ctrl/Cmd + C — copy (outside form fields)
    // Ctrl/Cmd + Shift + I / J — dev tools
    var blockedPlain = ["s", "u"];
    var blockedShift = ["i", "j", "c"];

    if (e.shiftKey && blockedShift.indexOf(key) !== -1) {
      e.preventDefault();
      return;
    }

    if (!e.shiftKey && blockedPlain.indexOf(key) !== -1) {
      e.preventDefault();
      return;
    }

    if (!e.shiftKey && key === "c" && !isInteractive(e.target)) {
      e.preventDefault();
    }
  });

  // 6. On touch devices, a long-press on an image normally opens
  //    the "save/share image" sheet. Cancelling touchend after a
  //    long hold on non-interactive images discourages that,
  //    without blocking scrolling, taps, or swipe gestures.
  var pressTimer = null;
  var longPressThreshold = 500;

  document.querySelectorAll("img").forEach(function (img) {
    if (isInteractive(img)) return;

    img.addEventListener("touchstart", function () {
      pressTimer = setTimeout(function () {
        pressTimer = "fired";
      }, longPressThreshold);
    }, { passive: true });

    img.addEventListener("touchend", function (e) {
      if (pressTimer === "fired") {
        e.preventDefault();
      }
      clearTimeout(pressTimer);
      pressTimer = null;
    });

    img.addEventListener("touchmove", function () {
      clearTimeout(pressTimer);
      pressTimer = null;
    }, { passive: true });
  });
})();
