const core = document.getElementById("core");
const glyphLog = document.getElementById("log");
const latinLog = document.getElementById("logLatin");

/* ===== SYSTEM LOG ===== */
const logs = [
  { glyph: "[SYS] SCANNING...", latin: "Scanning system..." },
  { glyph: "[OK] LINK STABLE", latin: "Connection stable" },
  { glyph: "[SYS] READY", latin: "System ready" }
];

let i = 0;
setInterval(()=>{
  glyphLog.textContent = logs[i].glyph;
  latinLog.textContent = logs[i].latin;
  i = (i + 1) % logs.length;
}, 2500);

/* ===== MODULE CONTENT ===== */
const MODULES = {

  archive: `
    <div class="module-view">
      <div class="dual">
        <div class="glyph">ARCHIVE DATABASE</div>
        <div class="latin">Stored records</div>
      </div>

      <p>Memory fragments stored.</p>

      <div class="back" onclick="resetCore()">RETURN</div>
    </div>
  `,

  signals: `
    <div class="module-view">
      <div class="dual">
        <div class="glyph">SIGNAL INTERFACE</div>
        <div class="latin">Incoming signals</div>
      </div>

      <p>No active signals.</p>

      <div class="back" onclick="resetCore()">RETURN</div>
    </div>
  `,

  connections: `
    <div class="module-view">
      <div class="dual">
        <div class="glyph">CONNECTION NODE</div>
        <div class="latin">Linked entities</div>
      </div>

      <p>Connections unstable.</p>

      <div class="back" onclick="resetCore()">RETURN</div>
    </div>
  `
};

/* ===== SAVE DEFAULT CORE ===== */
const defaultCore = core.innerHTML;

/* ===== OPEN MODULE ===== */
function openModule(name){

  glyphLog.textContent = `[OPEN] ${name.toUpperCase()}`;
  latinLog.textContent = `Accessing ${name}`;

  core.classList.add("fade-out");

  setTimeout(()=>{
    core.innerHTML = MODULES[name];
    core.classList.remove("fade-out");
    core.classList.add("fade-in");
  }, 200);
}

/* ===== RESET CORE ===== */
function resetCore(){

  glyphLog.textContent = "[SYS] RETURNING";
  latinLog.textContent = "Returning to main";

  core.classList.add("fade-out");

  setTimeout(()=>{
    core.innerHTML = defaultCore;
    core.classList.remove("fade-out");
    core.classList.add("fade-in");
  }, 200);
}
