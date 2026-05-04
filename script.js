const core = document.querySelector(".core");

function renderStoredData(){

  core.innerHTML = `

    <!-- PROFILE -->
    <div class="card">
      <div class="dual">
        <div class="glyph">SUBJECT PROFILE</div>
        <div class="latin">Identity</div>
      </div>

      <img src="assets/images/profile.jpg" class="media">

      <div class="dual">
        <div class="glyph">${PROFILE_DATA.name.toUpperCase()}</div>
        <div class="latin">${PROFILE_DATA.name}</div>
      </div>
    </div>

    <!-- STORED DATA -->
    <div class="card">
      <div class="dual">
        <div class="glyph">STORED DATA</div>
        <div class="latin">Psychological</div>
      </div>

      ${PROFILE_DATA.psychological.map(p => `
        <div class="dual">
          <div class="glyph">${p.toUpperCase()}</div>
          <div class="latin">${p}</div>
        </div>
      `).join("")}
    </div>

    <!-- MUSIC -->
    <div class="card">
      <div class="dual">
        <div class="glyph">MUSIC ARCHIVE</div>
        <div class="latin">Memory</div>
      </div>

      ${PROFILE_DATA.music.map(m => `
        <div class="latin">${m}</div>
      `).join("")}
    </div>

    <!-- SIGNALS -->
    <div class="card">
      <div class="dual">
        <div class="glyph">INCOMING SIGNALS</div>
        <div class="latin">Updates</div>
      </div>

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
    <div class="card">
      <div class="dual">
        <div class="glyph">CHRONICLES</div>
        <div class="latin">External Logs</div>
      </div>

      ${CHRONICLES.map(c => `
        <div class="dual">
          <div class="glyph">${c.title}</div>
          <div class="latin">${c.subtitle}</div>
        </div>
        <a href="${c.link}" target="_blank">OPEN</a>
      `).join("")}
    </div>

    <!-- FRAGMENTS -->
    <div class="card">
      <div class="dual">
        <div class="glyph">LINKING ENTITIES</div>
        <div class="latin">Fragments</div>
      </div>

      <div class="grid">
        ${FRAGMENTS.map(f => `
          <div onclick="window.open('${f.link}')">
            <img src="${f.image}">
            <div class="latin">${f.name}</div>
          </div>
        `).join("")}
      </div>
    </div>

  `;
}

/* LOAD */
renderStoredData();
