const core = document.getElementById("core");
const glyphLog = document.getElementById("log");
const latinLog = document.getElementById("logLatin");

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

/* MODULE CONTENT */
const MODULES = {
  archive: `
    <div class="dual">
      <div class="glyph">ARCHIVE DATABASE</div>
      <div class="latin">Stored records</div>
    </div>
    <div class="back" onclick="resetCore()">RETURN</div>
  `,
  signals: `
    <div class="dual">
      <div class="glyph">SIGNAL INTERFACE</div>
      <div class="latin">Incoming signals</div>
    </div>
    <div class="back" onclick="resetCore()">RETURN</div>
  `,
  connections: `
    <div class="dual">
      <div class="glyph">CONNECTION NODE</div>
      <div class="latin">Linked entities</div>
    </div>
    <div class="back" onclick="resetCore()">RETURN</div>
  `
};

const defaultCore = core.innerHTML;

function openModule(name){
  core.classList.add("fade-out");

  setTimeout(()=>{
    core.innerHTML = MODULES[name];
    core.classList.remove("fade-out");
    core.classList.add("fade-in");
  },200);
}

function resetCore(){
  core.classList.add("fade-out");

  setTimeout(()=>{
    core.innerHTML = defaultCore;
    core.classList.remove("fade-out");
    core.classList.add("fade-in");
  },200);
}
