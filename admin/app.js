(function () {
  "use strict";

  // Your deployed Apps Script Web App. If you ever create a NEW
  // deployment (rather than updating the existing one), paste the
  // new /exec URL here.
  var API_URL = "https://script.google.com/macros/s/AKfycbzgePBEBV-gauWuRHDS9N0rUkF0kiVUwn1zddjvOW4HrHNnPz0hsuXEMVMHQGhVgX_iw/exec";

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
     API helpers
     --------------------------------------------------------- */

  function apiGet(action) {
    return fetch(API_URL + "?action=" + encodeURIComponent(action))
      .then(function (r) { return r.json(); });
  }

  // Sent as text/plain to avoid a CORS preflight request, which
  // Apps Script web apps don't handle. The server still parses it
  // as JSON via e.postData.contents.
  function apiPost(payload) {
    return fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); });
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

    apiGet("list")
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

    fileToBase64(file)
      .then(function (base64) {
        return apiPost({
          action: "uploadImage",
          filename: file.name,
          mimeType: file.type || "image/jpeg",
          data: base64
        });
      })
      .then(function (res) {
        els.saveBtn.disabled = false;
        if (!res.ok) throw new Error(res.error || "Upload failed");
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
      .then(function (res) {
        if (!res.ok) throw new Error(res.error || "Save failed");
        closeForm();
        showBanner(id ? "Post updated." : "Post created.", "success");
        loadPosts();
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
      .then(function (res) {
        if (!res.ok) throw new Error(res.error || "Update failed");
        showBanner("Marked as " + newStatus + ".", "success");
        loadPosts();
      })
      .catch(function (err) {
        showBanner("Couldn't update status: " + err.message, "error");
      });
  }

  function confirmDelete(post) {
    var ok = window.confirm('Delete "' + (post.title || "this post") + '"? This can\'t be undone.');
    if (!ok) return;

    apiPost({ action: "delete", id: post.id })
      .then(function (res) {
        if (!res.ok) throw new Error(res.error || "Delete failed");
        showBanner("Post deleted.", "success");
        loadPosts();
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
