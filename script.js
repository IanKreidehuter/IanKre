const core = document.getElementById("core");

/* ===== PROFILE ===== */
function renderProfile(){
  core.innerHTML = `
    <img src="assets/images/profile.jpg" class="media">

    <div class="dual">
      <div class="glyph">${PROFILE_DATA.name.toUpperCase()}</div>
      <div class="latin">${PROFILE_DATA.name}</div>
    </div>

    ${PROFILE_DATA.psychological.map(p => `
      <div class="dual">
        <div class="glyph">${p.toUpperCase()}</div>
        <div class="latin">${p}</div>
      </div>
    `).join("")}

    <hr>

    ${PROFILE_DATA.music.map(m => `
      <div class="dual">
        <div class="glyph">${m.toUpperCase()}</div>
        <div class="latin">${m}</div>
      </div>
    `).join("")}
  `;
}

/* ===== UPDATES ===== */
function renderUpdates(){

  core.innerHTML = "";

  UPDATES.forEach(item => {

    let media = "";

    if(item.type === "image"){
      media = `<img src="${item.src}" class="media">`;
    }

    if(item.type === "video"){
      media = `<video controls class="media"><source src="${item.src}"></video>`;
    }

    if(item.type === "audio"){
      media = `<audio controls><source src="${item.src}"></audio>`;
    }

    core.innerHTML += `
      ${media}
      <div class="latin">${item.caption}</div>
    `;
  });
}

/* ===== CHRONICLES ===== */
function renderChronicles(){

  core.innerHTML = "";

  CHRONICLES.forEach(c => {
    core.innerHTML += `
      <div class="dual">
        <div class="glyph">${c.title}</div>
        <div class="latin">${c.subtitle}</div>
      </div>
      <a href="${c.link}" target="_blank">OPEN</a>
      <hr>
    `;
  });
}

/* ===== FRAGMENTS ===== */
function renderFragments(){

  core.innerHTML = `<div class="grid"></div>`;
  const grid = core.querySelector(".grid");

  FRAGMENTS.forEach(f => {
    const el = document.createElement("div");

    el.innerHTML = `
      <img src="${f.image}">
      <div class="latin">${f.name}</div>
    `;

    el.onclick = () => window.open(f.link, "_blank");

    grid.appendChild(el);
  });
}

/* ===== SWITCH ===== */
function openModule(name){
  if(name==="profile") return renderProfile();
  if(name==="archive") return renderUpdates();
  if(name==="chronicles") return renderChronicles();
  if(name==="fragments") return renderFragments();
}

/* DEFAULT */
renderProfile();
