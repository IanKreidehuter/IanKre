const core = document.getElementById("core");

/* ===== MAIN ROUTER ===== */
function openModule(type){
  if(type === "stored") return renderStored();
  if(type === "signals") return renderSignals();
  if(type === "fragments") return renderFragments();
}

/* ===== STORED DATA (FROM profile.js) ===== */
function renderStored(){

  if(typeof PROFILE === "undefined"){
    core.innerHTML = `
      <div class="overlay">
        <div class="dual" data-text="ERROR: PROFILE NOT FOUND"></div>
        <button class="sys-btn" onclick="resetCore()">RETURN</button>
      </div>
    `;
    return;
  }

  core.innerHTML = `
    <div class="overlay">

      <div class="dual" data-text="STORED DATA"></div>

      <!-- TOP PROFILE -->
      <div style="display:flex; gap:20px; align-items:flex-start;">

        <img src="assets/images/profile.jpg" class="avatar">

        <div>

          <div class="dual" data-text="${PROFILE.name.toUpperCase()}"></div>

          <div class="latin">
            Name : ${PROFILE.name}<br>
            Alias : ${PROFILE.alias}<br>
            Age : ${PROFILE.age}<br>
            Origin : ${PROFILE.origin}
          </div>

        </div>

      </div>

      <!-- DESCRIPTION -->
      <div class="overlay-content">

        <div class="latin" style="line-height:1.5;">
          ${PROFILE.description.join("<br>")}
        </div>

        <br><br>

        <!-- TWO COLUMN -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">

          <!-- LEFT -->
          <div>
            <div class="dual" data-text="PSYCHOLOGICAL RECORD"></div>

            ${PROFILE.psychological.map(p => `
              <div class="dual" data-text="${p.toUpperCase()}"></div>
            `).join("")}
          </div>

          <!-- RIGHT -->
          <div>
            <div class="dual" data-text="MUSIC ARCHIVE"></div>

            ${PROFILE.music.map(m => `
              <div class="dual" data-text="${m.toUpperCase()}"></div>
            `).join("")}
          </div>

        </div>

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
        <div class="dual" data-text="ERROR: NO SIGNAL DATA"></div>
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
              <div class="dual" data-text="${item.caption || "IMAGE SIGNAL"}"></div>
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
              <div class="dual" data-text="${f.name.toUpperCase()}"></div>
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
