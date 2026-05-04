const core = document.getElementById("core");

function openModule(type){

  if(type === "stored"){
    core.innerHTML = `
      <div class="overlay">

        <div class="dual">
          <div class="glyph">STORED DATA</div>
          <div class="latin">Archive</div>
        </div>

        <img src="assets/images/profile.jpg" class="avatar">

        <div class="dual">
          <div class="glyph">ANDRIAN KREIDEHÜTER</div>
          <div class="latin">Profile</div>
        </div>

        <div class="dual">
          <div class="glyph">COGNITIVE STRUCTURE</div>
          <div class="latin">Psychological</div>
        </div>

        <div class="dual">
          <div class="glyph">MEMORY LINKS</div>
          <div class="latin">Music archive</div>
        </div>

        <button onclick="resetCore()">RETURN</button>

      </div>
    `;
  }

  if(type === "signals"){
    core.innerHTML = `
      <div class="overlay">

        <div class="dual">
          <div class="glyph">INCOMING SIGNALS</div>
          <div class="latin">Live data</div>
        </div>

        <img src="assets/media/photo.jpg" class="media">

        <video controls class="media">
          <source src="assets/media/video.mp4">
        </video>

        <button onclick="resetCore()">RETURN</button>

      </div>
    `;
  }

  if(type === "fragments"){
    core.innerHTML = `
      <div class="overlay">

        <div class="dual">
          <div class="glyph">LINKED ENTITIES</div>
          <div class="latin">Fragments</div>
        </div>

        <div class="grid">
          <div onclick="window.open('https://example.com')">
            <img src="assets/images/f1.jpg">
          </div>
        </div>

        <button onclick="resetCore()">RETURN</button>

      </div>
    `;
  }
}

function resetCore(){
  location.reload();
}
