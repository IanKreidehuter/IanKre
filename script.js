const core = document.getElementById("core");

/* ===== ROUTER ===== */
function openModule(type){
  if(type === "stored") renderStored();
  if(type === "signals") renderSignals();
  if(type === "fragments") renderFragments();
}

/* ===== STORED DATA ===== */
function renderStored(){
  core.innerHTML = `
    <div class="overlay active">

      <div class="dual" data-text="STORED DATA"></div>

      <img src="assets/images/profile.jpg" class="avatar">

      <div class="dual" data-text="ANDRIAN KREIDEHÜTER"></div>

      <div class="overlay-content">

        <div class="dual" data-text="PSYCHOLOGICAL RECORD"></div>

        <div class="dual" data-text="SOCIAL ANXIETY"></div>
        <div class="dual" data-text="DEPRESSION"></div>
        <div class="dual" data-text="C-PTSD"></div>
        <div class="dual" data-text="ASD"></div>

        <br>

        <div class="dual" data-text="MUSIC ARCHIVE"></div>

        <div class="dual" data-text="LOST BOY — RUTH B."></div>
        <div class="dual" data-text="IRIS — GOO GOO DOLLS"></div>

      </div>

      <button class="sys-btn" onclick="resetCore()">RETURN</button>

    </div>
  `;
}

/* ===== SIGNALS ===== */
function renderSignals(){
  core.innerHTML = `
    <div class="overlay active">

      <div class="dual" data-text="INCOMING SIGNALS"></div>

      <div class="overlay-content">

        <div class="dual" data-text="SIGNAL RECEIVED"></div>
        <img src="assets/images/post1.jpg" class="media">

        <div class="dual" data-text="VIDEO SIGNAL"></div>
        <video controls class="media">
          <source src="assets/media/video.mp4">
        </video>

      </div>

      <button class="sys-btn" onclick="resetCore()">RETURN</button>

    </div>
  `;
}

/* ===== FRAGMENTS ===== */
function renderFragments(){
  core.innerHTML = `
    <div class="overlay active">

      <div class="dual" data-text="LINKED ENTITIES"></div>

      <div class="overlay-content">

        <div class="grid">

          <div onclick="window.open('https://example.com')">
            <img src="assets/images/fav-h.webp">
            <div class="dual" data-text="ENTITY H"></div>
          </div>

          <div onclick="window.open('https://example.com')">
            <img src="assets/images/fav-i.webp">
            <div class="dual" data-text="ENTITY I"></div>
          </div>

        </div>

      </div>

      <button class="sys-btn" onclick="resetCore()">RETURN</button>

    </div>
  `;
}

/* ===== RESET ===== */
function resetCore(){
  location.reload();
}
