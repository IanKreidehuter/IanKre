(function () {
  "use strict";

  /* =========================================================
     API
     ========================================================= */

  var API_URL =
    "https://script.google.com/macros/s/AKfycbzDkN67TjrkS1AnL-17PJtbIahL3U_EiOli7BOfevFNB_bcNKKvA_XNRMSS47pbw69Uzg/exec";


  /* =========================================================
     Footer year
     ========================================================= */

  var yearEl =
    document.getElementById("year");

  if (yearEl) {
    yearEl.textContent =
      new Date().getFullYear();
  }


  /* =========================================================
     Mobile navigation
     ========================================================= */

  var navToggle =
    document.getElementById("navToggle");

  var mobileMenu =
    document.getElementById("mobileMenu");


  function closeMenu() {

    if (!navToggle || !mobileMenu) {
      return;
    }

    mobileMenu.hidden = true;

    navToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    navToggle.setAttribute(
      "aria-label",
      "メニューを開く"
    );
  }


  function openMenu() {

    if (!navToggle || !mobileMenu) {
      return;
    }

    mobileMenu.hidden = false;

    navToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    navToggle.setAttribute(
      "aria-label",
      "メニューを閉じる"
    );
  }


  if (navToggle && mobileMenu) {

    navToggle.addEventListener(
      "click",
      function () {

        var isOpen =
          navToggle.getAttribute(
            "aria-expanded"
          ) === "true";

        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          closeMenu
        );

      });


    document.addEventListener(
      "keydown",
      function (e) {

        if (e.key === "Escape") {
          closeMenu();
        }

      }
    );

  }


  /* =========================================================
     Content protection
     ========================================================= */

  var INTERACTIVE_SELECTOR =
    "a, button, input, textarea, select, option, label, [role='button'], [contenteditable='true']";


  function isInteractive(target) {

    return !!(
      target &&
      target.closest &&
      target.closest(
        INTERACTIVE_SELECTOR
      )
    );

  }


  document.addEventListener(
    "contextmenu",
    function (e) {

      if (!isInteractive(e.target)) {
        e.preventDefault();
      }

    }
  );


  ["copy", "cut"].forEach(
    function (evt) {

      document.addEventListener(
        evt,
        function (e) {

          if (!isInteractive(e.target)) {
            e.preventDefault();
          }

        }
      );

    }
  );


  document.addEventListener(
    "selectstart",
    function (e) {

      if (!isInteractive(e.target)) {
        e.preventDefault();
      }

    }
  );


  document
    .querySelectorAll("img")
    .forEach(function (img) {

      img.setAttribute(
        "draggable",
        "false"
      );

      img.addEventListener(
        "dragstart",
        function (e) {
          e.preventDefault();
        }
      );

    });


  document.addEventListener(
    "keydown",
    function (e) {

      var key =
        (e.key || "").toLowerCase();

      var ctrlOrCmd =
        e.ctrlKey || e.metaKey;


      if (key === "f12") {
        e.preventDefault();
        return;
      }


      if (!ctrlOrCmd) {
        return;
      }


      var blockedPlain =
        ["s", "u"];

      var blockedShift =
        ["i", "j", "c"];


      if (
        e.shiftKey &&
        blockedShift.indexOf(key) !== -1
      ) {

        e.preventDefault();
        return;

      }


      if (
        !e.shiftKey &&
        blockedPlain.indexOf(key) !== -1
      ) {

        e.preventDefault();
        return;

      }


      if (
        !e.shiftKey &&
        key === "c" &&
        !isInteractive(e.target)
      ) {

        e.preventDefault();

      }

    }
  );


  var pressTimer = null;

  var longPressThreshold = 500;


  document
    .querySelectorAll("img")
    .forEach(function (img) {

      if (isInteractive(img)) {
        return;
      }


      img.addEventListener(
        "touchstart",
        function () {

          pressTimer =
            setTimeout(
              function () {

                pressTimer =
                  "fired";

              },
              longPressThreshold
            );

        },
        {
          passive: true
        }
      );


      img.addEventListener(
        "touchend",
        function (e) {

          if (
            pressTimer ===
            "fired"
          ) {

            e.preventDefault();

          }


          clearTimeout(
            pressTimer
          );

          pressTimer = null;

        }
      );


      img.addEventListener(
        "touchmove",
        function () {

          clearTimeout(
            pressTimer
          );

          pressTimer = null;

        },
        {
          passive: true
        }
      );

    });


  /* =========================================================
     Project elements
     ========================================================= */

  var projectTrack =
    document.getElementById(
      "projectTrack"
    );

  var projectSlider =
    document.getElementById(
      "projectSlider"
    );

  var projectsLoading =
    document.getElementById(
      "projectsLoading"
    );

  var projectControls =
    document.getElementById(
      "projectControls"
    );

  var projectPrev =
    document.getElementById(
      "projectPrev"
    );

  var projectNext =
    document.getElementById(
      "projectNext"
    );


  /* =========================================================
     Project state
     ========================================================= */

  var posts = [];

  var currentIndex = 0;

  var autoSlideTimer = null;


  /* =========================================================
     HTML escaping
     ========================================================= */

  function escapeHTML(value) {

    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }


    return String(value)
      .replace(
        /&/g,
        "&amp;"
      )
      .replace(
        /</g,
        "&lt;"
      )
      .replace(
        />/g,
        "&gt;"
      )
      .replace(
        /"/g,
        "&quot;"
      )
      .replace(
        /'/g,
        "&#039;"
      );

  }


  /* =========================================================
     Visible card count
     ========================================================= */

  function getVisibleCount() {

    var width =
      window.innerWidth;


    if (width <= 640) {
      return 1;
    }


    if (width <= 960) {
      return 2;
    }


    return 3;

  }


  /* =========================================================
     Media
     ========================================================= */

  function getMedia(post) {

    var imageUrl =
      String(
        post.image_url || ""
      ).trim();


    var videoUrl =
      String(
        post.video_url || ""
      ).trim();


    /* -------------------------
       Video
       ------------------------- */

    if (videoUrl) {

      return (
        '<video ' +
        'class="project-media-video" ' +
        'controls ' +
        'preload="metadata" ' +
        'playsinline>' +

          '<source src="' +
          escapeHTML(videoUrl) +
          '">' +

        '</video>'
      );

    }


    /* -------------------------
       Image
       ------------------------- */

    if (imageUrl) {

      /*
       * Convert Google Drive:
       *
       * https://drive.google.com/uc?export=view&id=FILE_ID
       *
       * into:
       *
       * https://drive.google.com/thumbnail?id=FILE_ID&sz=w1600
       *
       * This keeps the existing Sheet URL unchanged.
       */

      var driveId = null;


      var idMatch =
        imageUrl.match(
          /[?&]id=([^&#]+)/i
        );


      if (
        idMatch &&
        idMatch[1]
      ) {

        driveId =
          decodeURIComponent(
            idMatch[1]
          );

      }


      if (driveId) {

        imageUrl =
          "https://drive.google.com/thumbnail?id=" +
          encodeURIComponent(
            driveId
          ) +
          "&sz=w1600";

      }


      return (
        '<img ' +
        'src="' +
        escapeHTML(imageUrl) +
        '" ' +
        'alt="' +
        escapeHTML(
          post.title ||
          "制作物"
        ) +
        '" ' +
        'class="protected-img" ' +
        'draggable="false">'
      );

    }


    /* -------------------------
       No media
       ------------------------- */

    return (
      '<div class="project-media-empty">' +
        'No media' +
      '</div>'
    );

  }


  /* =========================================================
     Create project card
     ========================================================= */

  function createCard(post) {

    return (
      '<article class="project-card glass">' +

        '<div class="project-media">' +
          getMedia(post) +
        '</div>' +

        '<div class="project-body">' +

          '<h3>' +
            escapeHTML(
              post.title ||
              "制作物"
            ) +
          '</h3>' +

          '<p>' +
            escapeHTML(
              post.caption ||
              ""
            ) +
          '</p>' +

          '<div class="project-actions">' +

            '<button ' +
            'type="button" ' +
            'class="btn btn-small btn-primary project-detail-button" ' +
            'data-post-index="' +
            posts.indexOf(post) +
            '">' +
              '詳細' +
            '</button>' +

          '</div>' +

        '</div>' +

      '</article>'
    );

  }


  /* =========================================================
     Detail modal
     ========================================================= */

  function createDetailModal() {

    /*
     * IMPORTANT:
     * The modal is NOT created during page load.
     * It is only created when "詳細" is clicked.
     */

    var existing =
      document.getElementById(
        "projectDetailModal"
      );


    if (existing) {
      return existing;
    }


    var modal =
      document.createElement(
        "div"
      );


    modal.id =
      "projectDetailModal";

    modal.className =
      "project-detail-modal";


    modal.innerHTML =
      '<div class="project-detail-backdrop"></div>' +

      '<div class="project-detail-dialog" role="dialog" aria-modal="true">' +

        '<button ' +
        'type="button" ' +
        'class="project-detail-close" ' +
        'aria-label="閉じる">' +
          '×' +
        '</button>' +

        '<div ' +
        'class="project-detail-media" ' +
        'id="projectDetailMedia">' +
        '</div>' +

        '<div class="project-detail-content">' +

          '<h2 id="projectDetailTitle"></h2>' +

          '<p ' +
          'id="projectDetailCaption" ' +
          'class="project-detail-caption">' +
          '</p>' +

          '<div ' +
          'id="projectDetailText" ' +
          'class="project-detail-text">' +
          '</div>' +

        '</div>' +

      '</div>';


    document.body.appendChild(
      modal
    );


    var closeButton =
      modal.querySelector(
        ".project-detail-close"
      );


    var backdrop =
      modal.querySelector(
        ".project-detail-backdrop"
      );


    if (closeButton) {

      closeButton.addEventListener(
        "click",
        closeDetailModal
      );

    }


    if (backdrop) {

      backdrop.addEventListener(
        "click",
        closeDetailModal
      );

    }


    return modal;

  }


  function openDetailModal(post) {

    var modal =
      createDetailModal();


    var title =
      document.getElementById(
        "projectDetailTitle"
      );

    var caption =
      document.getElementById(
        "projectDetailCaption"
      );

    var text =
      document.getElementById(
        "projectDetailText"
      );

    var media =
      document.getElementById(
        "projectDetailMedia"
      );


    if (title) {

      title.textContent =
        post.title ||
        "制作物";

    }


    if (caption) {

      caption.textContent =
        post.caption ||
        "";

    }


    if (text) {

      text.textContent =
        post.content ||
        "";

    }


    if (media) {

      media.innerHTML =
        getMedia(post);

    }


    modal.style.display =
      "block";


    document.body.style.overflow =
      "hidden";

  }


  function closeDetailModal() {

    var modal =
      document.getElementById(
        "projectDetailModal"
      );


    if (!modal) {
      return;
    }


    modal.style.display =
      "none";


    document.body.style.overflow =
      "";

  }


  /* =========================================================
     Attach detail buttons
     ========================================================= */

  function attachDetailButtons() {

    if (!projectTrack) {
      return;
    }


    projectTrack
      .querySelectorAll(
        ".project-detail-button"
      )
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              var index =
                Number(
                  button.getAttribute(
                    "data-post-index"
                  )
                );


              var post =
                posts[index];


              if (post) {
                openDetailModal(post);
              }

            }
          );

        }
      );

  }


  /* =========================================================
     Slider
     ========================================================= */

  function updateSlider() {

    if (!projectTrack) {
      return;
    }


    var visibleCount =
      getVisibleCount();


    var total =
      posts.length;


    if (!total) {
      return;
    }


    var cardWidth =
      100 / visibleCount;


    var offset =
      currentIndex *
      cardWidth;


    projectTrack.style.transform =
      "translateX(-" +
      offset +
      "%)";


    if (projectControls) {

      projectControls.hidden =
        total <= visibleCount;

    }

  }


  function nextSlide() {

    if (!posts.length) {
      return;
    }


    var visibleCount =
      getVisibleCount();


    var maxIndex =
      Math.max(
        0,
        posts.length -
        visibleCount
      );


    if (
      currentIndex <
      maxIndex
    ) {

      currentIndex++;

    } else {

      currentIndex =
        0;

    }


    updateSlider();

  }


  function previousSlide() {

    if (!posts.length) {
      return;
    }


    var visibleCount =
      getVisibleCount();


    var maxIndex =
      Math.max(
        0,
        posts.length -
        visibleCount
      );


    if (
      currentIndex > 0
    ) {

      currentIndex--;

    } else {

      currentIndex =
        maxIndex;

    }


    updateSlider();

  }


  /* =========================================================
     Auto slide
     ========================================================= */

  function stopAutoSlide() {

    if (autoSlideTimer) {

      clearInterval(
        autoSlideTimer
      );

      autoSlideTimer =
        null;

    }

  }


  function startAutoSlide() {

    stopAutoSlide();


    if (
      posts.length <=
      getVisibleCount()
    ) {
      return;
    }


    autoSlideTimer =
      setInterval(
        function () {

          nextSlide();

        },
        5000
      );

  }


  /* =========================================================
     Render posts
     ========================================================= */

  function renderPosts() {

    if (!projectTrack) {
      return;
    }


    projectTrack.innerHTML =
      posts
        .map(
          createCard
        )
        .join("");


    currentIndex =
      0;


    attachDetailButtons();

    updateSlider();

    startAutoSlide();


    projectTrack
      .querySelectorAll("img")
      .forEach(
        function (image) {

          image.setAttribute(
            "draggable",
            "false"
          );


          image.addEventListener(
            "dragstart",
            function (event) {

              event.preventDefault();

            }
          );

        }
      );

  }


  /* =========================================================
     Load posts from Google Apps Script
     ========================================================= */

  async function loadPosts() {

    if (projectsLoading) {

      projectsLoading.hidden =
        false;

    }


    try {

      var response =
        await fetch(
          API_URL +
          "?action=list",
          {
            method: "GET",
            cache: "no-store"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Failed to connect to the backend."
        );

      }


      var data =
        await response.json();


      if (!data.success) {

        throw new Error(
          data.error ||
          "Failed to load posts."
        );

      }


      posts =
        Array.isArray(
          data.posts
        )
          ? data.posts
          : [];


      /*
       * Public website only shows
       * published posts.
       */

      posts =
        posts.filter(
          function (post) {

            return (
              String(
                post.status ||
                ""
              ).toLowerCase() ===
              "published"
            );

          }
        );


      /*
       * Backend gives newest rows first.
       * Reverse them so the newest post
       * enters from the right side.
       */

      posts.reverse();


      if (projectsLoading) {

        projectsLoading.hidden =
          true;

      }


      if (!posts.length) {

        if (projectTrack) {

          projectTrack.innerHTML =
            '<div class="project-media-empty">' +
              'No published posts yet.' +
            '</div>';

        }


        if (projectControls) {

          projectControls.hidden =
            true;

        }


        return;

      }


      renderPosts();

    }
    catch (error) {

      console.error(
        "Project loading error:",
        error
      );


      if (projectsLoading) {

        projectsLoading.textContent =
          "読み込みに失敗しました。";

        projectsLoading.hidden =
          false;

      }

    }

  }


  /* =========================================================
     Slider buttons
     ========================================================= */

  if (projectPrev) {

    projectPrev.addEventListener(
      "click",
      function () {

        previousSlide();

        startAutoSlide();

      }
    );

  }


  if (projectNext) {

    projectNext.addEventListener(
      "click",
      function () {

        nextSlide();

        startAutoSlide();

      }
    );

  }


  /* =========================================================
     Pause slider while hovering
     ========================================================= */

  if (projectSlider) {

    projectSlider.addEventListener(
      "mouseenter",
      function () {

        stopAutoSlide();

      }
    );


    projectSlider.addEventListener(
      "mouseleave",
      function () {

        startAutoSlide();

      }
    );

  }


  /* =========================================================
     Resize
     ========================================================= */

  var resizeTimer =
    null;


  window.addEventListener(
    "resize",
    function () {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          function () {

            var visibleCount =
              getVisibleCount();


            var maxIndex =
              Math.max(
                0,
                posts.length -
                visibleCount
              );


            if (
              currentIndex >
              maxIndex
            ) {

              currentIndex =
                maxIndex;

            }


            updateSlider();

            startAutoSlide();

          },
          150
        );

    }
  );


  /* =========================================================
     Escape closes detail modal
     ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {

        closeDetailModal();

      }

    }
  );


  /* =========================================================
     Start
     ========================================================= */

  loadPosts();

})();
