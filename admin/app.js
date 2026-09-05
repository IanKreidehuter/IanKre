(function () {
  "use strict";

  // Your deployed Apps Script Web App. If you ever create a NEW
  // deployment (rather than updating the existing one), paste the
  // new /exec URL here.
  var API_URL = "https://script.google.com/macros/s/AKfycbzgePBzEBV-gauWuRHDS9N0rUkF0kiVUwn1zddjvOW4HrHNnPz0hsuXEMVMhQGhVgX_iw/exec";

  var els = {
    banner: document.getElementById("banner"),
    newPostBtn: document.getElementById("newPostBtn"),
    searchInput: document.getElementById("searchInput"),
    postCount: document.getElementById("postCount"),
    postList: document.getElementById("postList"),
    loadingState: document.getElementById("loadingState"),
    emptyState: document.getElementById("emptyState"),
    errorState: document.getElementById("errorState"),

    formView: document.getElementById("formView"),
    formTitle: document.getElementById("formTitle"),
    postForm: document.getElementById("postForm"),
    closeFormBtn: document.getElementById("closeFormBtn"),
    cancelBtn: document.getElementById("cancelBtn"),
    saveBtn: document.getElementById("saveBtn"),

    postId: document.getElementById("postId"),
    titleInput: document.getElementById("titleInput"),
    slugInput: document.getElementById("slugInput"),
    excerptInput: document.getElementById("excerptInput"),
    contentInput: document.getElementById("contentInput"),
    imageInput: document.getElementById("imageInput"),
    imagePreviewWrap: document.getElementById("imagePreviewWrap"),
    imagePreview: document.getElementById("imagePreview"),
    removeImageBtn: document.getElementById("removeImageBtn"),
    imageUrlInput: document.getElementById("imageUrlInput"),
    uploadStatus: document.getElementById("uploadStatus"),
    statusInput: document.getElementById("statusInput")
  };

  var allPosts = [];
  var slugManuallyEdited = false;

  /* ---------------------------------------------------------
     API helpers — CORS-free by design
     -----------------------------------------------------------
     Apps Script web apps never send Access-Control-Allow-Origin, so
     a fetch() that tries to READ a cross-origin response is always
     blocked, regardless of headers used on the request. So:
       - Reads (list, uploadstatus) go through JSONP via a <script>
         tag — not subject to CORS at all, and fully readable.
       - Writes (create/update/delete/uploadImage) are sent as a
         no-cors fetch() POST with a CORS-safelisted content type
         (application/x-www-form-urlencoded). This never triggers a
         preflight and is never blocked — but the response is opaque
         by design, so we never attempt to read it. The client just
         waits briefly, then re-fetches the real state via JSONP.
     --------------------------------------------------------- */

  function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function jsonp(url) {
    return new Promise(function (resolve, reject) {
      var callbackName = "jsonp_cb_" + Date.now() + "_" + Math.floor(Math.random() * 1e6);
      var script = document.createElement("script");

      var timer = setTimeout(function () {
        cleanup();
        reject(new Error("Request timed out"));
      }, 20000);

      function cleanup() {
        delete window[callbackName];
        if (script.parentNode) script.parentNode.removeChild(script);
        clearTimeout(timer);
      }

      window[callbackName] = function (data) {
        cleanup();
        resolve(data);
      };

      script.onerror = function () {
        cleanup();
        reject(new Error("Network error loading posts"));
      };

      script.src = url + (url.indexOf("?") === -1 ? "?" : "&") + "callback=" + encodeURIComponent(callbackName);
      document.body.appendChild(script);
    });
  }

  function apiGetList() {
    return jsonp(API_URL + "?action=list");
  }

  // Apps Script needs a brief moment after the POST lands to finish
  // writing to the Sheet/Drive before a follow-up JSONP read is
  // guaranteed to reflect it.
  var POST_SETTLE_DELAY_MS = 1200;

  // Fire-and-forget write. Resolves once the request has been sent
  // and given time to be processed; rejects only on an actual network
  // failure (e.g. offline) — never on the (unreadable) response itself.
  function apiPost(payload) {
    var body = new URLSearchParams();
    Object.keys(payload).forEach(function (key) {
      var value = payload[key];
      if (value === undefined || value === null) return;
      body.append(key, String(value));
    });

    return fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: body.toString()
    }).then(function () {
      return delay(POST_SETTLE_DELAY_MS);
    });
  }

  // Image upload result can't come back through the opaque no-cors
  // response, so uploadImage() on the server caches it (keyed by
  // uploadId) and we poll for it here via the readable JSONP channel.
  function pollUploadStatus(uploadId) {
    var maxAttempts = 10;
    var intervalMs = 1000;

    function attempt(n) {
      return jsonp(API_URL + "?action=uploadstatus&uploadId=" + encodeURIComponent(uploadId))
        .then(function (res) {
          if (res && res.ready) return res;
          if (n >= maxAttempts) {
            return { ok: false, error: "Upload is taking longer than expected. Please try again." };
          }
          return delay(intervalMs).then(function () { return attempt(n + 1); });
        });
    }

    return attempt(1);
  }

  /* ---------------------------------------------------------
     Banner / messages
     --------------------------------------------------------- */

  var bannerTimer = null;
  function showBanner(message, type) {
    els.banner.textContent = message;
    els.banner.className = "banner " + (type === "error" ? "banner-error" : "banner-success");
    els.banner.hidden = false;
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(function () { els.banner.hidden = true; }, 4000);
  }

  /* ---------------------------------------------------------
     List rendering
     --------------------------------------------------------- */

  function formatDate(iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function renderList() {
    var query = els.searchInput.value.trim().toLowerCase();
    var posts = allPosts.filter(function (p) {
      if (!query) return true;
      return (p.title || "").toLowerCase().indexOf(query) !== -1 ||
             (p.slug || "").toLowerCase().indexOf(query) !== -1;
    });

    els.postCount.textContent = posts.length + (posts.length === 1 ? " post" : " posts");
    els.postList.innerHTML = "";
    els.emptyState.hidden = posts.length !== 0;

    posts.forEach(function (post) {
      var row = document.createElement("div");
      row.className = "post-row";

      var statusClass = post.status === "published" ? "status-published" : "status-draft";
      var statusLabel = post.status === "published" ? "Published" : "Draft";
      var toggleLabel = post.status === "published" ? "Unpublish" : "Publish";

      row.innerHTML =
        '<div class="post-row-title">' +
          '<strong></strong>' +
          '<span></span>' +
        '</div>' +
        '<span class="status-badge ' + statusClass + '"></span>' +
        '<span class="post-row-updated"></span>' +
        '<div class="post-row-actions">' +
          '<button type="button" class="btn btn-ghost btn-small" data-action="edit">Edit</button>' +
          '<button type="button" class="btn btn-ghost btn-small" data-action="toggle"></button>' +
          '<button type="button" class="btn btn-danger btn-small" data-action="delete">Delete</button>' +
        '</div>';

      row.querySelector(".post-row-title strong").textContent = post.title || "(untitled)";
      row.querySelector(".post-row-title span").textContent = "/" + (post.slug || "");
      row.querySelector(".status-badge").textContent = statusLabel;
      row.querySelector(".post-row-updated").textContent = formatDate(post.updated_at || post.created_at);
      row.querySelector('[data-action="toggle"]').textContent = toggleLabel;

      row.querySelector('[data-action="edit"]').addEventListener("click", function () { openEditForm(post); });
      row.querySelector('[data-action="toggle"]').addEventListener("click", function () { toggleStatus(post); });
      row.querySelector('[data-action="delete"]').addEventListener("click", function () { confirmDelete(post); });

      els.postList.appendChild(row);
    });
  }

  function loadPosts() {
    els.loadingState.hidden = false;
    els.errorState.hidden = true;
    els.emptyState.hidden = true;

    apiGetList()
      .then(function (res) {
        els.loadingState.hidden = true;
        if (!res.ok) throw new Error(res.error || "Failed to load posts");
        allPosts = res.posts || [];
        renderList();
      })
      .catch(function (err) {
        els.loadingState.hidden = true;
        els.errorState.hidden = false;
        els.errorState.textContent = "Couldn't load posts: " + err.message;
      });
  }

  /* ---------------------------------------------------------
     Slug helper
     --------------------------------------------------------- */

  function slugify(text) {
    return (text || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  els.titleInput.addEventListener("input", function () {
    if (!slugManuallyEdited) {
      els.slugInput.value = slugify(els.titleInput.value);
    }
  });

  els.slugInput.addEventListener("input", function () {
    slugManuallyEdited = true;
  });

  /* ---------------------------------------------------------
     Form open/close
     --------------------------------------------------------- */

  function resetForm() {
    els.postForm.reset();
    els.postId.value = "";
    els.imageUrlInput.value = "";
    els.imagePreviewWrap.hidden = true;
    els.imagePreview.src = "";
    els.uploadStatus.textContent = "";
    slugManuallyEdited = false;
  }

  function openNewForm() {
    resetForm();
    els.formTitle.textContent = "New Post";
    els.formView.hidden = false;
    els.titleInput.focus();
  }

  function openEditForm(post) {
    resetForm();
    slugManuallyEdited = true; // don't overwrite an existing slug while editing
    els.formTitle.textContent = "Edit Post";
    els.postId.value = post.id;
    els.titleInput.value = post.title || "";
    els.slugInput.value = post.slug || "";
    els.excerptInput.value = post.excerpt || "";
    els.contentInput.value = post.content || "";
    els.statusInput.value = post.status === "published" ? "published" : "draft";
    els.imageUrlInput.value = post.image_url || "";
    if (post.image_url) {
      els.imagePreview.src = post.image_url;
      els.imagePreviewWrap.hidden = false;
    }
    els.formView.hidden = false;
  }

  function closeForm() {
    els.formView.hidden = true;
  }

  els.newPostBtn.addEventListener("click", openNewForm);
  els.closeFormBtn.addEventListener("click", closeForm);
  els.cancelBtn.addEventListener("click", closeForm);
  els.formView.addEventListener("click", function (e) {
    if (e.target === els.formView) closeForm();
  });

  /* ---------------------------------------------------------
     Image upload
     --------------------------------------------------------- */

  function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var result = reader.result; // data:<mime>;base64,<data>
        var base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  els.imageInput.addEventListener("change", function () {
    var file = els.imageInput.files[0];
    if (!file) return;

    els.uploadStatus.textContent = "Uploading…";
    els.saveBtn.disabled = true;

    var uploadId = "u" + Date.now() + "_" + Math.floor(Math.random() * 1e6);

    fileToBase64(file)
      .then(function (base64) {
        return apiPost({
          action: "uploadImage",
          uploadId: uploadId,
          filename: file.name,
          mimeType: file.type || "image/jpeg",
          data: base64
        });
      })
      .then(function () {
        return pollUploadStatus(uploadId);
      })
      .then(function (res) {
        els.saveBtn.disabled = false;
        if (!res || !res.ok || !res.image_url) {
          throw new Error((res && res.error) || "Upload failed");
        }
        els.imageUrlInput.value = res.image_url;
        els.imagePreview.src = res.image_url;
        els.imagePreviewWrap.hidden = false;
        els.uploadStatus.textContent = "Image uploaded.";
      })
      .catch(function (err) {
        els.saveBtn.disabled = false;
        els.uploadStatus.textContent = "Upload failed: " + err.message;
      });
  });

  els.removeImageBtn.addEventListener("click", function () {
    els.imageUrlInput.value = "";
    els.imageInput.value = "";
    els.imagePreviewWrap.hidden = true;
    els.uploadStatus.textContent = "";
  });

  /* ---------------------------------------------------------
     Save (create/update)
     --------------------------------------------------------- */

  els.postForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var id = els.postId.value;
    var payload = {
      action: id ? "update" : "create",
      id: id || undefined,
      title: els.titleInput.value.trim(),
      slug: slugify(els.slugInput.value),
      excerpt: els.excerptInput.value.trim(),
      content: els.contentInput.value,
      image_url: els.imageUrlInput.value,
      status: els.statusInput.value
    };

    if (!payload.title || !payload.slug) {
      showBanner("Title and slug are required.", "error");
      return;
    }

    els.saveBtn.disabled = true;
    els.saveBtn.textContent = "Saving…";

    apiPost(payload)
      .then(function () {
        loadPosts();
        closeForm();
        resetForm();
        showBanner(id ? "Post updated." : "Post created.", "success");
      })
      .catch(function (err) {
        showBanner("Couldn't save post: " + err.message, "error");
      })
      .finally(function () {
        els.saveBtn.disabled = false;
        els.saveBtn.textContent = "Save Post";
      });
  });

  /* ---------------------------------------------------------
     Toggle status / delete
     --------------------------------------------------------- */

  function toggleStatus(post) {
    var newStatus = post.status === "published" ? "draft" : "published";
    apiPost({ action: "update", id: post.id, status: newStatus })
      .then(function () {
        loadPosts();
        showBanner("Marked as " + newStatus + ".", "success");
      })
      .catch(function (err) {
        showBanner("Couldn't update status: " + err.message, "error");
      });
  }

  function confirmDelete(post) {
    var ok = window.confirm('Delete "' + (post.title || "this post") + '"? This can\'t be undone.');
    if (!ok) return;

    apiPost({ action: "delete", id: post.id })
      .then(function () {
        loadPosts();
        showBanner("Post deleted.", "success");
      })
      .catch(function (err) {
        showBanner("Couldn't delete post: " + err.message, "error");
      });
  }

  /* ---------------------------------------------------------
     Search
     --------------------------------------------------------- */

  els.searchInput.addEventListener("input", renderList);

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */

  loadPosts();
})();
