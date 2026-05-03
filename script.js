const glyphLog = document.getElementById("log");
const latinLog = document.getElementById("logLatin");

const logs = [
  { glyph: "[SYS] SCANNING IDENTITY...", latin: "Scanning identity..." },
  { glyph: "[OK] NEURAL LINK STABLE", latin: "Neural connection stable" },
  { glyph: "[SYS] LOADING MODULES...", latin: "Loading modules..." },
  { glyph: "[OK] SYSTEM READY", latin: "System ready" }
];

let i = 0;

setInterval(()=>{
  glyphLog.textContent = logs[i].glyph;
  latinLog.textContent = logs[i].latin;
  i = (i + 1) % logs.length;
}, 2500);

function openModule(name){
  glyphLog.textContent = `[OPEN] ${name.toUpperCase()}`;
  latinLog.textContent = `Opening ${name} module`;
}
