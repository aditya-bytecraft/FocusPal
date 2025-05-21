let timer;
let totalMinutes = 25;
let seconds = 0;
let sessionCount = localStorage.getItem('sessions') || 0;

document.getElementById('sessionCount').innerText = sessionCount;
document.getElementById('focusProgress').value = sessionCount;

// Real-time Indian clock
const updateClock = () => {
  const now = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
  document.getElementById("clock").innerText = now;
};
setInterval(updateClock, 1000);

// Timer logic
function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    if (seconds === 0) {
      if (totalMinutes === 0) {
        clearInterval(timer);
        timer = null;
        alert("⏰ Time's up! Great job staying focused!");
        sessionCount++;
        localStorage.setItem('sessions', sessionCount);
        document.getElementById('sessionCount').innerText = sessionCount;
        document.getElementById('focusProgress').value = sessionCount;
        resetTimer();
        return;
      }
      totalMinutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  totalMinutes = parseInt(document.getElementById("timeSelect").value);
  seconds = 0;
  updateDisplay();
}

function updateDisplay() {
  let m = totalMinutes.toString().padStart(2, '0');
  let s = seconds.toString().padStart(2, '0');
  document.getElementById('time').innerText = `${m}:${s}`;
}

document.getElementById("timeSelect").addEventListener("change", () => {
  resetTimer();
});

// Notes functionality
const notesArea = document.getElementById('notes');
notesArea.value = localStorage.getItem('focusNotes') || "";

notesArea.addEventListener('input', () => {
  localStorage.setItem('focusNotes', notesArea.value);
});

// Initial Setup
resetTimer();
updateClock();
