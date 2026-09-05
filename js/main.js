/* =========================================================
   API
   ========================================================= */

var API_URL =
  "https://script.google.com/macros/s/AKfycbzDkN67TjrkS1AnL-17PJtbIahL3U_EiOli7BOfevFNB_bcNKKvA_XNRMSS47pbw69Uzg/exec";


/* =========================================================
   FOOTER YEAR
   ========================================================= */

var yearElement =
  document.getElementById("year");

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

var navToggle =
  document.getElementById("navToggle");

var mobileMenu =
  document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {

  navToggle.addEventListener(
    "click",
    function () {

      var expanded =
        navToggle.getAttribute(
          "aria-expanded"
        ) === "true";

      navToggle.setAttribute(
        "aria-expanded",
        String(!expanded)
      );

      mobileMenu.hidden =
        expanded;

    }
  );


  mobileMenu
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          navToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          mobileMenu.hidden =
            true;

        }
      );

    });

}


/* =========================================================
   CONTENT PROTECTION
   ========================================================= */

document.addEventListener(
  "contextmenu",
  function (event) {
    event.preventDefault();
  }
);

document.addEventListener(
  "copy",
  function (event) {
    event.preventDefault();
  }
);

document.addEventListener(
  "cut",
  function (event) {
    event.preventDefault();
  }
);

document.addEventListener(
  "dragstart",
  function (event) {

    if (
      event.target &&
      event.target.tagName === "IMG"
    ) {
      event.preventDefault();
    }

  }
);

document.addEventListener(
  "selectstart",
  function (event) {

    var target =
      event.target;

    if (
      target &&
      (
        target.tagName === "IMG" ||
        target.closest(".protected-img")
      )
    ) {
      event.preventDefault();
    }

  }
);

document.addEventListener(
  "keydown",
  function (event) {

    var key =
      String(event.key || "").toLowerCase();

    if (
      (event.ctrlKey || event.metaKey) &&
      (
        key === "u" ||
        key === "s" ||
        key === "c" ||
        key === "x" ||
        key === "a"
      )
    ) {
      event.preventDefault();
    }

    if (
      event.key === "F12"
    ) {
      event.preventDefault();
    }

    if (
      event.ctrlKey &&
      event.shiftKey &&
      (
        key === "i" ||
        key === "j" ||
        key === "c"
      )
    ) {
      event.preventDefault();
    }

  }
);


/* =========================================================
   PROJECT ELEMENTS
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
   PROJECT DATA
   ========================================================= */

var posts = [];

var currentIndex = 0;

var autoSlideTimer = null;


/* =========================================================
   HELPERS
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
   VISIBLE CARD COUNT
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
   MEDIA
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


  /* VIDEO */

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


  /* IMAGE */

  if (imageUrl) {

    /*
     * Google Drive's uc?export=view URL
     * can fail when used directly inside
     * an <img> element.
     *
     * Convert the Drive file ID to the
     * thumbnail endpoint instead.
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
      'draggable="false" ' +
      'loading="lazy">'
    );

  }


  return (
    '<div class="project-media-empty">' +
      'No media' +
    '</div>'
  );

}


/* =========================================================
   CREATE PROJECT CARD
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
   DETAIL MODAL
   ========================================================= */

function ensureDetailModal() {

  var modal =
    document.getElementById(
      "projectDetailModal"
    );

  if (modal) {
    return modal;
  }


  modal =
    document.createElement(
      "div"
    );

  modal.id =
    "projectDetailModal";

  modal.className =
    "project-detail-modal";

  modal.hidden =
    true;

  modal.innerHTML =
    '<div class="project-detail-backdrop"></div>' +

    '<div class="project-detail-dialog" role="dialog" aria-modal="true">' +

      '<button ' +
      'type="button" ' +
      'class="project-detail-close" ' +
      'id="projectDetailClose" ' +
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
    document.getElementById(
      "projectDetailClose"
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
    ensureDetailModal();

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


  if (!modal) {
    return;
  }


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


  modal.hidden =
    false;

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

  modal.hidden =
    true;

  document.body.style.overflow =
    "";

}


/* =========================================================
   DETAIL BUTTONS
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
   SLIDER POSITION
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


  /*
   * Each card occupies an equal
   * percentage of the track.
   */

  var cardWidth =
    100 / visibleCount;

  var offset =
    currentIndex *
    cardWidth;


  projectTrack.style.transform =
    "translateX(-" +
    offset +
    "%)";


  /*
   * Hide controls when there
   * is nothing to slide.
   */

  if (projectControls) {

    projectControls.hidden =
      total <= visibleCount;

  }

}


/* =========================================================
   NEXT SLIDE
   ========================================================= */

function nextSlide() {

  if (
    !posts.length
  ) {
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

    /*
     * Return to the first card.
     */

    currentIndex =
      0;

  }


  updateSlider();

}


/* =========================================================
   PREVIOUS SLIDE
   ========================================================= */

function previousSlide() {

  if (
    !posts.length
  ) {
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
   AUTO SLIDE
   ========================================================= */

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


function stopAutoSlide() {

  if (
    autoSlideTimer
  ) {

    clearInterval(
      autoSlideTimer
    );

    autoSlideTimer =
      null;

  }

}


/* =========================================================
   RENDER POSTS
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


  /*
   * Apply image drag protection
   * to newly created images.
   */

  projectTrack
    .querySelectorAll(
      "img"
    )
    .forEach(
      function (image) {

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
   LOAD POSTS
   ========================================================= */

async function loadPosts() {

  if (
    projectsLoading
  ) {

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


    if (
      !response.ok
    ) {

      throw new Error(
        "Failed to connect to the backend."
      );

    }


    var data =
      await response.json();


    if (
      !data.success
    ) {

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
     * Only published posts
     * are visible publicly.
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
     * Backend returns the newest
     * rows first.
     *
     * Reverse them so the oldest
     * card starts on the left and
     * newer cards enter from the
     * right as the slider moves left.
     */

    posts.reverse();


    if (
      projectsLoading
    ) {

      projectsLoading.hidden =
        true;

    }


    if (
      !posts.length
    ) {

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


    if (
      projectsLoading
    ) {

      projectsLoading.textContent =
        "読み込みに失敗しました。";

      projectsLoading.hidden =
        false;

    }

  }

}


/* =========================================================
   SLIDER BUTTONS
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
   PAUSE AUTO SLIDE WHILE HOVERING
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
   RESIZE
   ========================================================= */

var resizeTimer = null;

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
   ESC CLOSE MODAL
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
   START
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    ensureDetailModal();

    loadPosts();

  }
);
