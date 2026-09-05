(function () {
  "use strict";


  /* =========================================================
     Footer year
     ========================================================= */

  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* =========================================================
     Mobile navigation
     ========================================================= */

  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {

    if (!mobileMenu || !navToggle) {
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

    if (!mobileMenu || !navToggle) {
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
     Casual content-protection layer
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


  /* Disable context menu outside controls */

  document.addEventListener(
    "contextmenu",
    function (e) {

      if (!isInteractive(e.target)) {
        e.preventDefault();
      }

    }
  );


  /* Block copy/cut outside controls */

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


  /* Prevent selection outside form fields */

  document.addEventListener(
    "selectstart",
    function (e) {

      if (!isInteractive(e.target)) {
        e.preventDefault();
      }

    }
  );


  /* Prevent image dragging */

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


  /* Block common casual shortcuts */

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


      var blockedPlain = [
        "s",
        "u"
      ];

      var blockedShift = [
        "i",
        "j",
        "c"
      ];


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


  /* Long press protection */

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
                pressTimer = "fired";
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

          if (pressTimer === "fired") {
            e.preventDefault();
          }

          clearTimeout(pressTimer);
          pressTimer = null;

        }
      );


      img.addEventListener(
        "touchmove",
        function () {

          clearTimeout(pressTimer);
          pressTimer = null;

        },
        {
          passive: true
        }
      );

    });


  /* =========================================================
     Dynamic Projects / Posts
     ========================================================= */

  var API_URL =
    "https://script.google.com/macros/s/AKfycbzDkN67TjrkS1AnL-17PJtbIahL3U_EiOli7BOfevFNB_bcNKKvA_XNRMSS47pbw69Uzg/exec";


  var track =
    document.getElementById(
      "projectTrack"
    );

  var slider =
    document.getElementById(
      "projectSlider"
    );

  var loading =
    document.getElementById(
      "projectsLoading"
    );

  var controls =
    document.getElementById(
      "projectControls"
    );

  var prevButton =
    document.getElementById(
      "projectPrev"
    );

  var nextButton =
    document.getElementById(
      "projectNext"
    );


  if (!track || !slider) {
    return;
  }


  var posts = [];

  var currentIndex = 0;

  var autoSlideTimer = null;


  /* =========================================================
     Helpers
     ========================================================= */

  function getVisibleCount() {

    if (window.innerWidth <= 640) {
      return 1;
    }

    if (window.innerWidth <= 960) {
      return 2;
    }

    return 3;
  }


  function escapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function getMedia(post) {

    var imageUrl =
      String(
        post.image_url || ""
      ).trim();

    var videoUrl =
      String(
        post.video_url || ""
      ).trim();


    if (videoUrl) {

      return (
        '<video ' +
        'class="project-media-video" ' +
        'controls ' +
        'preload="metadata">' +

          '<source src="' +
          escapeHTML(videoUrl) +
          '">' +

        '</video>'
      );

    }


    if (imageUrl) {

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

    var article =
      document.createElement(
        "article"
      );

    article.className =
      "project-card glass";


    article.innerHTML =

      '<div class="project-media">' +

        getMedia(post) +

      '</div>' +


      '<div class="project-body">' +

        '<h3>' +
          escapeHTML(
            post.title ||
            "無題"
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
          'class="btn btn-small btn-primary project-detail-btn">' +
            '詳細' +
          '</button>' +

        '</div>' +

      '</div>';


    var detailButton =
      article.querySelector(
        ".project-detail-btn"
      );


    if (detailButton) {

      detailButton.addEventListener(
        "click",
        function () {
          showPostDetail(post);
        }
      );

    }


    return article;
  }


  /* =========================================================
     Detail modal
     ========================================================= */

  function showPostDetail(post) {

    var oldModal =
      document.getElementById(
        "projectDetailModal"
      );


    if (oldModal) {
      oldModal.remove();
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

      '<div ' +
      'class="project-detail-dialog glass" ' +
      'role="dialog" ' +
      'aria-modal="true">' +

        '<button ' +
        'type="button" ' +
        'class="project-detail-close" ' +
        'aria-label="閉じる">' +
          '×' +
        '</button>' +

        '<div class="project-detail-media">' +
          getMedia(post) +
        '</div>' +

        '<div class="project-detail-content">' +

          '<h2>' +
            escapeHTML(
              post.title ||
              "無題"
            ) +
          '</h2>' +

          '<p class="project-detail-caption">' +
            escapeHTML(
              post.caption ||
              ""
            ) +
          '</p>' +

          '<div class="project-detail-text">' +
            escapeHTML(
              post.content ||
              ""
            ).replace(
              /\n/g,
              "<br>"
            ) +
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


    function closeModal() {

      modal.remove();

      document.removeEventListener(
        "keydown",
        escapeHandler
      );

    }


    function escapeHandler(e) {

      if (e.key === "Escape") {
        closeModal();
      }

    }


    closeButton.addEventListener(
      "click",
      closeModal
    );

    backdrop.addEventListener(
      "click",
      closeModal
    );


    document.addEventListener(
      "keydown",
      escapeHandler
    );

  }


  /* =========================================================
     Slider
     ========================================================= */

  function updateSlider(animate) {

    var visible =
      getVisibleCount();


    if (!posts.length) {
      return;
    }


    if (animate === false) {

      track.style.transition =
        "none";

    } else {

      track.style.transition =
        "transform 0.65s cubic-bezier(.22,.61,.36,1)";

    }


    var cardWidth =
      100 / visible;


    var gapPercentage =
      (
        1.5 /
        slider.clientWidth
      ) * 100;


    var offset =
      currentIndex *
      (
        cardWidth +
        gapPercentage
      );


    track.style.transform =
      "translateX(-" +
      offset +
      "%)";


    if (animate === false) {

      requestAnimationFrame(
        function () {

          requestAnimationFrame(
            function () {

              track.style.transition =
                "transform 0.65s cubic-bezier(.22,.61,.36,1)";

            }
          );

        }
      );

    }

  }


  function nextSlide() {

    var visible =
      getVisibleCount();


    if (
      posts.length <= visible
    ) {
      return;
    }


    currentIndex++;


    if (
      currentIndex >
      posts.length - visible
    ) {

      currentIndex = 0;

      updateSlider(false);

      return;
    }


    updateSlider(true);

  }


  function previousSlide() {

    var visible =
      getVisibleCount();


    if (
      posts.length <= visible
    ) {
      return;
    }


    currentIndex--;


    if (currentIndex < 0) {

      currentIndex =
        posts.length -
        visible;

    }


    updateSlider(true);

  }


  function startAutoSlide() {

    clearInterval(
      autoSlideTimer
    );


    if (
      posts.length <=
      getVisibleCount()
    ) {
      return;
    }


    autoSlideTimer =
      setInterval(
        nextSlide,
        5000
      );

  }


  /* =========================================================
     Render posts
     ========================================================= */

  function renderPosts() {

    track.innerHTML = "";


    if (!posts.length) {

      loading.textContent =
        "まだ公開されている制作物はありません。";

      loading.hidden = false;

      controls.hidden = true;

      return;
    }


    loading.hidden = true;


    posts.forEach(
      function (post) {

        track.appendChild(
          createCard(post)
        );

      }
    );


    currentIndex = 0;


    controls.hidden =
      posts.length <=
      getVisibleCount();


    updateSlider(false);

    startAutoSlide();


    /*
     * Apply image protection to
     * dynamically-created images.
     */

    document
      .querySelectorAll(
        "#projectTrack img.protected-img"
      )
      .forEach(
        function (img) {

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

        }
      );

  }


  /* =========================================================
     Load posts from Google Apps Script
     ========================================================= */

  function loadPosts() {

    fetch(
      API_URL +
      "?action=list",
      {
        method: "GET",
        cache: "no-store"
      }
    )

      .then(
        function (response) {

          if (!response.ok) {

            throw new Error(
              "HTTP " +
              response.status
            );

          }

          return response.json();

        }
      )

      .then(
        function (data) {

          if (
            !data ||
            data.success === false
          ) {

            throw new Error(
              data &&
              data.error
                ? data.error
                : "投稿データを取得できませんでした。"
            );

          }


          var receivedPosts =
            Array.isArray(
              data.posts
            )
              ? data.posts
              : [];


          /*
           * Only published posts
           * appear on the public site.
           */

          posts =
            receivedPosts.filter(
              function (post) {

                return String(
                  post.status ||
                  ""
                ).toLowerCase() ===
                  "published";

              }
            );


          /*
           * Google Apps Script already
           * returns newest rows first.
           *
           * Reverse them so the oldest
           * card starts on the left and
           * newer posts enter from the
           * right as the slider moves.
           */

          posts.reverse();


          renderPosts();

        }
      )

      .catch(
        function (error) {

          console.error(
            "Projects loading failed:",
            error
          );


          loading.textContent =
            "制作物を読み込めませんでした。";

          loading.hidden = false;

        }
      );

  }


  /* =========================================================
     Slider buttons
     ========================================================= */

  if (nextButton) {

    nextButton.addEventListener(
      "click",
      function () {

        nextSlide();

        startAutoSlide();

      }
    );

  }


  if (prevButton) {

    prevButton.addEventListener(
      "click",
      function () {

        previousSlide();

        startAutoSlide();

      }
    );

  }


  /* =========================================================
     Resize
     ========================================================= */

  window.addEventListener(
    "resize",
    function () {

      updateSlider(false);

      controls.hidden =
        posts.length <=
        getVisibleCount();

      startAutoSlide();

    }
  );


  /* =========================================================
     Pause while hovering
     ========================================================= */

  slider.addEventListener(
    "mouseenter",
    function () {

      clearInterval(
        autoSlideTimer
      );

    }
  );


  slider.addEventListener(
    "mouseleave",
    function () {

      startAutoSlide();

    }
  );


  /* =========================================================
     Start
     ========================================================= */

  loadPosts();

})();
