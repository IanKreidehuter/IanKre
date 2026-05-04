const core = document.getElementById("core");

/* ===== MAIN ROUTER ===== */
function openModule(type){
  if(type === "stored") return renderStored();
  if(type === "signals") return renderSignals();
  if(type === "fragments") return renderFragments();
}

/* ===== STORED DATA ===== */
function renderStored(){
  core.innerHTML = `
    <div class="overlay">

      <div class="dual" data-text="STORED DATA"></div>

      <img src="assets/images/profile.jpg" class="avatar">

      <div class="dual" data-text="ANDRIAN KREIDEHÜTER"></div>

      <div class="overlay-content">

        <div class="dual" data-text="SOCIAL ANXIETY"></div>
        <div class="dual" data-text="DEPRESSION"></div>
        <div class="dual" data-text="C-PTSD"></div>
        <div class="dual" data-text="ASD"></div>

        <div class="dual" data-text="MUSIC ARCHIVE"></div>

        <div class="dual" data-text="LOST BOY — RUTH B."></div>
        <div class="dual" data-text="IRIS — GOO GOO DOLLS"></div>

      </div>

      <button class="sys-btn" onclick="resetCore()">RETURN</button>

    </div>
  `;
}

/* ===== INCOMING SIGNALS (FROM updates.js) ===== */
function renderSignals(){

  if(typeof UPDATES === "undefined"){
    core.innerHTML = `
      <div class="overlay">
        <div class="dual" data-text="ERROR: NO DATA"></div>
        <button class="sys-btn" onclick="resetCore()">RETURN</button>
      </div>
    `;
    return;
  }

  core.innerHTML = `
    <div class="overlay">

      <div class="dual" data-text="INCOMING SIGNALS"></div>

      <div class="overlay-content">

        ${UPDATES.map(item => {

          if(item.type === "image"){
            return `
              <div class="dual" data-text="${item.caption || "SIGNAL"}"></div>
              <img src="${item.src}" class="media">
            `;
          }

          if(item.type === "video"){
            return `
              <div class="dual" data-text="${item.caption || "VIDEO SIGNAL"}"></div>
              <video controls class="media">
                <source src="${item.src}">
              </video>
            `;
          }

          if(item.type === "audio"){
            return `
              <div class="dual" data-text="${item.caption || "AUDIO SIGNAL"}"></div>
              <audio controls>
                <source src="${item.src}">
              </audio>
            `;
          }

          return "";

        }).join("")}

      </div>

      <button class="sys-btn" onclick="resetCore()">RETURN</button>

    </div>
  `;
}

/* ===== FRAGMENTS (FROM fragments.js) ===== */
function renderFragments(){

  if(typeof FRAGMENTS === "undefined"){
    core.innerHTML = `
      <div class="overlay">
        <div class="dual" data-text="ERROR: NO FRAGMENTS"></div>
        <button class="sys-btn" onclick="resetCore()">RETURN</button>
      </div>
    `;
    return;
  }

  core.innerHTML = `
    <div class="overlay">

      <div class="dual" data-text="LINKED ENTITIES"></div>

      <div class="overlay-content">

        <div class="grid">

          ${FRAGMENTS.map(f => `
            <div onclick="window.open('${f.link}', '_blank')">
              <img src="${f.image}">
              <div class="dual" data-text="${f.name}"></div>
            </div>
          `).join("")}

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
