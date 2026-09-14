/* ==========================================================================
   Kanji Cards — app logic
   Plain JS, no build step, no dependencies.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- Storage keys ---------------- */

  const STORAGE_PROGRESS = "kanjicard.progress.v1";
  const STORAGE_SETTINGS = "kanjicard.settings.v1";

  const DEFAULT_SETTINGS = {
    level: "N5",
    mode: "smart", // smart | all | new | not_yet | remembered
    sound: false,
    sensitivity: "medium",
    theme: "auto"
  };

  const SENSITIVITY_PX = { low: 160, medium: 110, high: 70 };

  /* ---------------- State ---------------- */

  let progress = loadProgress();     // { [kanji]: { status } }
  let settings = loadSettings();     // { level, mode, sound, sensitivity }
  let queue = [];                    // array of kanji objects, in study order
  let queuePos = 0;                  // index of the currently-active card in queue
  let history = [];                  // undo stack: { kanji, prevStatus, wasNew }
  const MAX_HISTORY = 10;

  /* ---------------- DOM refs ---------------- */

  const el = {
    stack: document.getElementById("cardStack"),
    emptyState: document.getElementById("emptyState"),
    emptyMessage: document.getElementById("emptyMessage"),
    emptyResetView: document.getElementById("emptyResetView"),

    progressCount: document.getElementById("progressCount"),
    progressBar: document.getElementById("progressBar"),
    progressFill: document.getElementById("progressFill"),
    countRemembered: document.getElementById("countRemembered"),
    countNotYet: document.getElementById("countNotYet"),
    countNew: document.getElementById("countNew"),
    levelPill: document.getElementById("levelPill"),

    btnNotYet: document.getElementById("btnNotYet"),
    btnRemembered: document.getElementById("btnRemembered"),
    btnReveal: document.getElementById("btnReveal"),
    undoBtn: document.getElementById("undoBtn"),

    settingsBtn: document.getElementById("settingsBtn"),
    settingsOverlay: document.getElementById("settingsOverlay"),
    closeSettings: document.getElementById("closeSettings"),
    levelSelect: document.getElementById("levelSelect"),
    studyModeGroup: document.getElementById("studyModeGroup"),
    soundToggle: document.getElementById("soundToggle"),
    sensitivitySelect: document.getElementById("sensitivitySelect"),
    resetBtn: document.getElementById("resetBtn"),

    confirmOverlay: document.getElementById("confirmOverlay"),
    cancelReset: document.getElementById("cancelReset"),
    confirmReset: document.getElementById("confirmReset"),

    liveRegion: document.getElementById("liveRegion")
  };

  /* ---------------- Persistence helpers ---------------- */

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      /* localStorage unavailable — app still works for this session */
    }
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_SETTINGS);
      return raw ? Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw)) : Object.assign({}, DEFAULT_SETTINGS);
    } catch (e) {
      return Object.assign({}, DEFAULT_SETTINGS);
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
    } catch (e) { /* ignore */ }
  }

  function getStatus(kanji) {
    const entry = progress[kanji];
    return entry && entry.status ? entry.status : "new";
  }

  function setStatus(kanji, status) {
    progress[kanji] = { status: status };
    saveProgress();
  }

  /* ---------------- Data / queue ---------------- */

  function currentLevelData() {
    return KANJI_LEVELS[settings.level] || KANJI_LEVELS.N5;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildQueue() {
    const data = currentLevelData();
    const byStatus = { new: [], not_yet: [], remembered: [] };
    data.forEach((k) => byStatus[getStatus(k.kanji)].push(k));

    let list;
    switch (settings.mode) {
      case "all":
        list = shuffle(data);
        break;
      case "new":
        list = shuffle(byStatus.new);
        break;
      case "not_yet":
        list = shuffle(byStatus.not_yet);
        break;
      case "remembered":
        list = shuffle(byStatus.remembered);
        break;
      case "smart":
      default:
        // New first, then not-yet, remembered excluded from the active session.
        list = shuffle(byStatus.new).concat(shuffle(byStatus.not_yet));
        break;
    }
    queue = list;
    queuePos = 0;
  }

  function activeCardData() {
    return queue[queuePos] || null;
  }
  function peekCardData(offset) {
    return queue[queuePos + offset] || null;
  }

  /* ---------------- Rendering ---------------- */

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function buildCardHTML(k) {
    const meanings = k.meanings.join(", ");
    const onyomi = k.onyomi.length ? k.onyomi.join("、") : "—";
    const kunyomi = k.kunyomi.length ? k.kunyomi.join("、") : "—";
    const examplesHtml = (k.examples || [])
      .map(
        (ex) => `
        <div class="example-item">
          <span class="example-word">${escapeHtml(ex.word)}</span>
          <span class="example-reading">${escapeHtml(ex.reading)}</span>
          <span class="example-meaning">${escapeHtml(ex.meaning)}</span>
        </div>`
      )
      .join("");

    return `
      <div class="kcard-face kcard-face--front">
        <span class="kcard-level">${escapeHtml(k.level)}</span>
        <span class="kcard-glyph">${escapeHtml(k.kanji)}</span>
        <p class="kcard-prompt">Do you remember this?</p>
      </div>
      <div class="kcard-face kcard-face--back">
        <span class="kcard-back-glyph">${escapeHtml(k.kanji)}</span>
        <div class="kcard-section">
          <div class="kcard-section-label"><span class="jp">意味</span> Meaning</div>
          <div class="kcard-section-value">${escapeHtml(meanings)}</div>
        </div>
        <div class="kcard-section">
          <div class="kcard-section-label"><span class="jp">音読み</span> On'yomi</div>
          <div class="kcard-section-value">${escapeHtml(onyomi)}</div>
        </div>
        <div class="kcard-section">
          <div class="kcard-section-label"><span class="jp">訓読み</span> Kun'yomi</div>
          <div class="kcard-section-value">${escapeHtml(kunyomi)}</div>
        </div>
        ${
          examplesHtml
            ? `<div class="kcard-section">
                 <div class="kcard-section-label"><span class="jp">例</span> Examples</div>
               </div>
               <div class="kcard-examples">${examplesHtml}</div>`
            : ""
        }
      </div>
      <div class="swipe-flag swipe-flag--right" data-flag="right">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Remembered
      </div>
      <div class="swipe-flag swipe-flag--left" data-flag="left">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
        Not yet
      </div>
      <div class="swipe-flag swipe-flag--up" data-flag="up">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M12 5l-5 5M12 5l5 5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Show answer
      </div>
    `;
  }

  // Currently mounted card DOM elements, keyed by stack offset 0/1/2
  let mountedCards = [];

  function renderStack() {
    el.stack.querySelectorAll(".kcard").forEach((n) => n.remove());

    const active = activeCardData();

    if (!active) {
      showEmptyState();
      updateCounters();
      updateProgress();
      return;
    }
    hideEmptyState();

    mountedCards = [];
    for (let offset = 2; offset >= 0; offset--) {
      const data = peekCardData(offset);
      if (!data) continue;
      const cardEl = document.createElement("div");
      cardEl.className = "kcard";
      cardEl.dataset.stackPos = String(offset);
      cardEl.dataset.kanji = data.kanji;
      cardEl.innerHTML = buildCardHTML(data);
      el.stack.appendChild(cardEl);
      if (offset === 0) {
        attachDrag(cardEl, data);
        mountedCards[0] = cardEl;
      }
    }

    updateCounters();
    updateProgress();
  }

  function showEmptyState() {
    let message = "You've gone through every card in this study mode.";
    if (settings.mode === "smart") {
      message = "No new or not-yet Kanji left to study right now. Try Remembered mode to review, or reset progress to start over.";
    } else if (settings.mode === "new") {
      message = "No new Kanji left — everything has been seen at least once.";
    } else if (settings.mode === "not_yet") {
      message = "Nothing marked \u201cnot yet\u201d right now. Nicely done.";
    } else if (settings.mode === "remembered") {
      message = "Nothing marked \u201cremembered\u201d yet.";
    } else if (settings.mode === "all") {
      message = "That's every Kanji in this level.";
    }
    el.emptyMessage.textContent = message;
    el.emptyState.hidden = false;
  }

  function hideEmptyState() {
    el.emptyState.hidden = true;
  }

  function updateCounters() {
    const data = currentLevelData();
    let rem = 0, notYet = 0, isNew = 0;
    data.forEach((k) => {
      const s = getStatus(k.kanji);
      if (s === "remembered") rem++;
      else if (s === "not_yet") notYet++;
      else isNew++;
    });
    el.countRemembered.textContent = rem;
    el.countNotYet.textContent = notYet;
    el.countNew.textContent = isNew;
    el.levelPill.textContent = settings.level;
  }

  function updateProgress() {
    const data = currentLevelData();
    const total = data.length;
    const done = data.filter((k) => getStatus(k.kanji) !== "new").length;
    el.progressCount.textContent = `${done} / ${total}`;
    const pct = total ? Math.round((done / total) * 100) : 0;
    el.progressFill.style.width = pct + "%";
    el.progressBar.setAttribute("aria-valuenow", String(pct));
  }

  function announce(text) {
    el.liveRegion.textContent = text;
  }

  /* ---------------- Drag / swipe interaction ---------------- */

  function attachDrag(cardEl, data) {
    let startX = 0, startY = 0;
    let dx = 0, dy = 0;
    let dragging = false;
    let pointerId = null;

    const threshold = () => SENSITIVITY_PX[settings.sensitivity] || SENSITIVITY_PX.medium;
    const upThreshold = () => Math.max(70, threshold() * 0.85);

    function onPointerDown(e) {
      if (cardEl.classList.contains("revealed") && !isPrimaryButton(e)) {
        // allow scrolling the revealed back content without hijacking every touch,
        // but still allow dragging by grabbing anywhere on the card.
      }
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      dragging = true;
      cardEl.classList.add("dragging");
      cardEl.setPointerCapture && cardEl.setPointerCapture(pointerId);
    }

    function isPrimaryButton(e) {
      return e.button === 0 || e.pointerType !== "mouse";
    }

    function onPointerMove(e) {
      if (!dragging || e.pointerId !== pointerId) return;
      dx = e.clientX - startX;
      dy = e.clientY - startY;

      // Once a clear horizontal or vertical intent is established, prevent page scroll.
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        e.preventDefault();
      }

      const rotate = Math.max(-18, Math.min(18, dx / 12));
      cardEl.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`;

      const rightFlag = cardEl.querySelector('[data-flag="right"]');
      const leftFlag = cardEl.querySelector('[data-flag="left"]');
      const upFlag = cardEl.querySelector('[data-flag="up"]');

      const horizontalDominant = Math.abs(dx) > Math.abs(dy);
      if (horizontalDominant) {
        const t = Math.min(1, Math.abs(dx) / threshold());
        if (dx > 0) {
          rightFlag.style.opacity = String(t);
          leftFlag.style.opacity = "0";
        } else {
          leftFlag.style.opacity = String(t);
          rightFlag.style.opacity = "0";
        }
        upFlag.style.opacity = "0";
      } else if (dy < 0) {
        const t = Math.min(1, Math.abs(dy) / upThreshold());
        upFlag.style.opacity = String(t);
        rightFlag.style.opacity = "0";
        leftFlag.style.opacity = "0";
      }
    }

    function onPointerUp(e) {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      cardEl.classList.remove("dragging");

      const horizontalDominant = Math.abs(dx) > Math.abs(dy);

      if (horizontalDominant && dx > threshold()) {
        commitSwipe(cardEl, data, "remembered");
      } else if (horizontalDominant && dx < -threshold()) {
        commitSwipe(cardEl, data, "not_yet");
      } else if (!horizontalDominant && dy < -upThreshold()) {
        revealCard(cardEl);
        resetCardPosition(cardEl);
      } else {
        resetCardPosition(cardEl);
      }
      dx = 0;
      dy = 0;
    }

    function resetCardPosition(cardEl) {
      cardEl.style.transform = "";
      cardEl.querySelectorAll(".swipe-flag").forEach((f) => (f.style.opacity = "0"));
    }

    cardEl.addEventListener("pointerdown", onPointerDown);
    cardEl.addEventListener("pointermove", onPointerMove, { passive: false });
    cardEl.addEventListener("pointerup", onPointerUp);
    cardEl.addEventListener("pointercancel", onPointerUp);
  }

  function revealCard(cardEl) {
    cardEl.classList.add("revealed");
  }

  function commitSwipe(cardEl, data, status) {
    const prevStatus = getStatus(data.kanji);
    const wasAtQueuePos = queuePos;

    cardEl.classList.add(status === "remembered" ? "leaving-right" : "leaving-left");

    history.push({ kanji: data.kanji, prevStatus, queuePos: wasAtQueuePos });
    if (history.length > MAX_HISTORY) history.shift();

    setStatus(data.kanji, status);
    announce(`${data.kanji} marked ${status === "remembered" ? "remembered" : "not yet"}.`);
    showUndo();

    window.setTimeout(() => {
      queuePos += 1;
      renderStack();
    }, 260);

    updateCounters();
    updateProgress();
  }

  /* ---------------- Buttons ---------------- */

  function handleReveal() {
    const cardEl = el.stack.querySelector('.kcard[data-stack-pos="0"]');
    if (cardEl) revealCard(cardEl);
  }

  function handleAnswer(status) {
    const cardEl = el.stack.querySelector('.kcard[data-stack-pos="0"]');
    const data = activeCardData();
    if (!cardEl || !data) return;
    commitSwipe(cardEl, data, status);
  }

  function handleUndo() {
    const last = history.pop();
    if (!last) return;
    progress[last.kanji] = { status: last.prevStatus };
    saveProgress();
    queuePos = last.queuePos;
    renderStack();
    announce(`Undid last answer for ${last.kanji}.`);
    if (history.length === 0) hideUndo();
  }

  function showUndo() {
    el.undoBtn.hidden = false;
  }
  function hideUndo() {
    el.undoBtn.hidden = true;
  }

  /* ---------------- Settings panel ---------------- */

  function openSettings() {
    el.settingsOverlay.hidden = false;
    syncSettingsUI();
  }
  function closeSettingsPanel() {
    el.settingsOverlay.hidden = true;
  }

  function syncSettingsUI() {
    el.levelSelect.value = settings.level;
    el.sensitivitySelect.value = settings.sensitivity;
    el.soundToggle.setAttribute("aria-checked", String(settings.sound));
    el.studyModeGroup.querySelectorAll(".segmented-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.mode === settings.mode);
    });
  }

  function applySettingsChange() {
    saveSettings();
    buildQueue();
    renderStack();
  }

  /* ---------------- Reset ---------------- */

  function openConfirmReset() {
    el.confirmOverlay.hidden = false;
  }
  function closeConfirmReset() {
    el.confirmOverlay.hidden = true;
  }
  function doReset() {
    progress = {};
    saveProgress();
    history = [];
    hideUndo();
    closeConfirmReset();
    closeSettingsPanel();
    buildQueue();
    renderStack();
    announce("Progress has been reset.");
  }

  /* ---------------- Keyboard ---------------- */

  function isTypingTarget(e) {
    const tag = (e.target && e.target.tagName) || "";
    return tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable;
  }

  function onKeyDown(e) {
    if (isTypingTarget(e)) return;
    if (!el.settingsOverlay.hidden || !el.confirmOverlay.hidden) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        handleAnswer("not_yet");
        break;
      case "ArrowRight":
        e.preventDefault();
        handleAnswer("remembered");
        break;
      case "ArrowUp":
      case " ":
        e.preventDefault();
        handleReveal();
        break;
      case "u":
      case "U":
        e.preventDefault();
        handleUndo();
        break;
    }
  }

  /* ---------------- Theme (respects OS, no manual toggle required) ---------------- */

  function initTheme() {
    // The stylesheet already responds to prefers-color-scheme automatically;
    // no explicit override is applied unless a future settings toggle sets one.
  }

  /* ---------------- Wire up events ---------------- */

  function init() {
    // Buttons
    el.btnNotYet.addEventListener("click", () => handleAnswer("not_yet"));
    el.btnRemembered.addEventListener("click", () => handleAnswer("remembered"));
    el.btnReveal.addEventListener("click", handleReveal);
    el.undoBtn.addEventListener("click", handleUndo);
    el.emptyResetView.addEventListener("click", () => {
      settings.mode = "all";
      saveSettings();
      syncSettingsUI();
      applySettingsChange();
    });

    // Settings panel
    el.settingsBtn.addEventListener("click", openSettings);
    el.closeSettings.addEventListener("click", closeSettingsPanel);
    el.settingsOverlay.addEventListener("click", (e) => {
      if (e.target === el.settingsOverlay) closeSettingsPanel();
    });

    el.levelSelect.addEventListener("change", () => {
      settings.level = el.levelSelect.value;
      applySettingsChange();
    });

    el.studyModeGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".segmented-btn");
      if (!btn) return;
      settings.mode = btn.dataset.mode;
      syncSettingsUI();
      applySettingsChange();
    });

    el.soundToggle.addEventListener("click", () => {
      settings.sound = !settings.sound;
      el.soundToggle.setAttribute("aria-checked", String(settings.sound));
      saveSettings();
    });

    el.sensitivitySelect.addEventListener("change", () => {
      settings.sensitivity = el.sensitivitySelect.value;
      saveSettings();
    });

    el.resetBtn.addEventListener("click", openConfirmReset);
    el.cancelReset.addEventListener("click", closeConfirmReset);
    el.confirmOverlay.addEventListener("click", (e) => {
      if (e.target === el.confirmOverlay) closeConfirmReset();
    });
    el.confirmReset.addEventListener("click", doReset);

    // Keyboard
    document.addEventListener("keydown", onKeyDown);

    // Prevent iOS bounce/scroll while actively dragging a card
    el.stack.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );

    initTheme();
    syncSettingsUI();
    buildQueue();
    renderStack();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
