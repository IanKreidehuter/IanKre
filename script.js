const core = document.getElementById("core");

function openModule(type){
  if(type==="stored") renderStored();
  if(type==="signals") renderSignals();
  if(type==="fragments") renderFragments();
}

function renderStored(){

  core.innerHTML = `
  <div class="overlay active">

    <div class="dual" data-text="STORED DATA"></div>

    <div style="display:flex; gap:20px;">

      <img src="assets/images/profile.jpg" class="avatar">

      <div>
        <div class="dual" data-text="NAME : ${PROFILE.name}"></div>
        <div class="dual" data-text="ALIAS : ${PROFILE.alias}"></div>
        <div class="dual" data-text="AGE : ${PROFILE.age}"></div>
        <div class="dual" data-text="ORIGIN : ${PROFILE.origin}"></div>
      </div>

    </div>

    <div class="overlay-content">

      ${PROFILE.description.map(d =>
        d ? `<div class="dual" data-text="${d}"></div>` : "<br>"
      ).join("")}

      <br>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">

        <div>
          <div class="dual" data-text="PSYCHOLOGICAL RECORD"></div>
          ${PROFILE.psychological.map(p =>
            `<div class="dual" data-text="${p}"></div>`
          ).join("")}
        </div>

        <div>
          <div class="dual" data-text="MUSIC ARCHIVE"></div>
          ${PROFILE.music.map(m =>
            `<div class="dual" data-text="${m}"></div>`
          ).join("")}
        </div>

      </div>

    </div>

    <button class="sys-btn" onclick="location.reload()">RETURN</button>

  </div>
  `;
}

function renderSignals(){

  core.innerHTML = `
  <div class="overlay active">

    <div class="dual" data-text="INCOMING SIGNALS"></div>

    <div class="overlay-content">

      ${UPDATES.map(u => {

        if(u.type==="image"){
          return `<div class="dual" data-text="${u.caption}"></div>
                  <img src="${u.src}" class="media">`;
        }

        if(u.type==="video"){
          return `<div class="dual" data-text="${u.caption}"></div>
                  <video controls class="media">
                    <source src="${u.src}">
                  </video>`;
        }

      }).join("")}

    </div>

    <button class="sys-btn" onclick="location.reload()">RETURN</button>

  </div>
  `;
}

function renderFragments(){

  core.innerHTML = `
  <div class="overlay active">

    <div class="dual" data-text="LINKED ENTITIES"></div>

    <div class="overlay-content">

      <div class="grid">
        ${FRAGMENTS.map(f => `
          <div onclick="window.open('${f.link}')">
            <img src="${f.image}">
            <div class="dual" data-text="${f.name}"></div>
          </div>
        `).join("")}
      </div>

    </div>

    <button class="sys-btn" onclick="location.reload()">RETURN</button>

  </div>
  `;
}
