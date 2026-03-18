let timer = null;
let elapsedMs = 0;
let lapCount = 0;

function start() {
  if (timer !== null) return;

  const startTime = Date.now() - elapsedMs;

  timer = setInterval(function () {
    elapsedMs = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(elapsedMs);
  }, 10);

  document.getElementById("startBtn").disabled = true;
  document.getElementById("pauseBtn").disabled = false;
}

function pause() {
  clearInterval(timer);
  timer = null;

  document.getElementById("startBtn").disabled = false;
  document.getElementById("pauseBtn").disabled = true;
}

function reset() {
  clearInterval(timer);
  timer = null;
  elapsedMs = 0;
  lapCount = 0;

  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("lapList").innerHTML = "";
  document.getElementById("startBtn").disabled = false;
  document.getElementById("pauseBtn").disabled = true;
}

function lap() {
  if (timer === null) return;

  lapCount++;
  const li = document.createElement("li");
  li.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(elapsedMs)}</span>`;
  document.getElementById("lapList").prepend(li);
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(centiseconds).padStart(2, "0")
  );
}