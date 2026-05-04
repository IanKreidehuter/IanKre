const core = document.getElementById("core");

function renderStoredData(){

  core.innerHTML = `

    <!-- PROFILE -->
    <div class="block">
      <img src="assets/images/profile.jpg" class="avatar">

      <div class="dual">
        <div class="glyph">${PROFILE_DATA.name.toUpperCase()}</div>
        <div class="latin">${PROFILE_DATA.name}</div>
      </div>
    </div>

    <!-- IDENTITY -->
    <div class="block">
      ${PROFILE_DATA.psychological.map(p => `
        <div class="dual">
          <div class="glyph">${p.toUpperCase()}</div>
          <div class="latin">${p}</div>
        </div>
      `).join("")}
    </div>

    <!-- MUSIC -->
    <div class="block">
      ${PROFILE_DATA.music.map(m => `
        <div class="dual">
          <div class="glyph">${m.toUpperCase()}</div>
          <div class="latin">${m}</div>
        </div>
      `).join("")}
    </div>

    <!-- UPDATES (MEDIA MIX) -->
    <div class="block">
      ${UPDATES.map(item => {

        if(item.type === "image"){
          return `<img src="${item.src}" class="media">`;
        }

        if(item.type === "video"){
          return `<video controls class="media"><source src="${item.src}"></video>`;
        }

        if(item.type === "audio"){
          return `<audio controls><source src="${item.src}"></audio>`;
        }

      }).join("")}
    </div>

    <!-- CHRONICLES -->
    <div class="block">
      ${CHRONICLES.map(c => `
        <div class="dual">
          <div class="glyph">${c.title}</div>
          <div class="latin">${c.subtitle}</div>
        </div>
        <a href="${c.link}" target="_blank">OPEN</a>
      `).join("")}
    </div>

    <!-- FRAGMENTS -->
    <div class="block grid">
      ${FRAGMENTS.map(f => `
        <div onclick="window.open('${f.link}')">
          <img src="${f.image}">
          <div class="latin">${f.name}</div>
        </div>
      `).join("")}
    </div>

  `;
}

/* AUTO LOAD */
renderStoredData();
