let h = document.getElementById("h");
let m = document.getElementById("m");
let s = document.getElementById("s");
let timer = 0;
let idsetInt;

const start = document.getElementById("start");

start.addEventListener("click", function () {
  console.log("start");
  lanchTimer(true);
  start.disabled = true;
});

const pause = document.getElementById("pause");

pause.addEventListener("click", function () {
  lanchTimer(false);
  console.log("pause");
  start.disabled = false;
});

const reset = document.getElementById("reset");

reset.addEventListener("click", function () {
  console.log("rest");
  timer = 0;
  onUpdateUI(timer);
});

function lanchTimer(isRunning) {
  if (isRunning) {
    idsetInt = setInterval(() => {
      timer++;
      onUpdateUI(timer);
    }, 1000);
  } else {
    clearInterval(idsetInt);
    intervalId = null;
  }
}

function onUpdateUI(timer) {
  const hh = Math.floor(timer / 3600);
  const mm = Math.floor((timer % 3600) / 60);
  const ss = timer % 60;

  h.innerHTML = String(hh).padStart(2, "0");
  m.innerHTML = String(mm).padStart(2, "0");
  s.innerHTML = String(ss).padStart(2, "0");
}

function updateWorldClocks() {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  document.getElementById("algeria").textContent = new Intl.DateTimeFormat(
    "en-GB",
    {
      ...options,
      timeZone: "Africa/Algiers",
    },
  ).format(new Date());

  document.getElementById("london").textContent = new Intl.DateTimeFormat(
    "en-GB",
    {
      ...options,
      timeZone: "Europe/London",
    },
  ).format(new Date());

  document.getElementById("paris").textContent = new Intl.DateTimeFormat(
    "en-GB",
    {
      ...options,
      timeZone: "Europe/Paris",
    },
  ).format(new Date());

  document.getElementById("newyork").textContent = new Intl.DateTimeFormat(
    "en-GB",
    {
      ...options,
      timeZone: "America/New_York",
    },
  ).format(new Date());

  document.getElementById("tokyo").textContent = new Intl.DateTimeFormat(
    "en-GB",
    {
      ...options,
      timeZone: "Asia/Tokyo",
    },
  ).format(new Date());
}

updateWorldClocks();

setInterval(updateWorldClocks, 1000);
// ================================
// COUNTDOWN TIMER
// ================================

const inputHours = document.getElementById("inputHours");
const inputMinutes = document.getElementById("inputMinutes");
const inputSeconds = document.getElementById("inputSeconds");

const setTime = document.getElementById("setTime");

const countdownH = document.getElementById("countdownH");
const countdownM = document.getElementById("countdownM");
const countdownS = document.getElementById("countdownS");

const countdownStart = document.getElementById("countdownStart");
const countdownPause = document.getElementById("countdownPause");
const countdownReset = document.getElementById("countdownReset");

let countdown = 0;
let countdownInterval = null;

// SET TIMER
setTime.addEventListener("click", function () {
  const hours = Number(inputHours.value) || 0;
  const minutes = Number(inputMinutes.value) || 0;
  const seconds = Number(inputSeconds.value) || 0;

  countdown = hours * 3600 + minutes * 60 + seconds;

  updateCountdownUI();
});

// START
countdownStart.addEventListener("click", function () {
  // Don't create multiple intervals
  if (countdownInterval !== null) {
    return;
  }

  if (countdown <= 0) {
    return;
  }

  countdownInterval = setInterval(function () {
    countdown--;

    updateCountdownUI();

    // Stop when reaching zero
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;

      alert("⏰ Time is up!");
    }
  }, 1000);
});

// PAUSE
countdownPause.addEventListener("click", function () {
  clearInterval(countdownInterval);

  countdownInterval = null;
});

// RESET
countdownReset.addEventListener("click", function () {
  clearInterval(countdownInterval);
  countdownInterval = null;

  // Restore initial values
  inputHours.value = "00";
  inputMinutes.value = "01";
  inputSeconds.value = "00";

  // Restore countdown to 1 minute
  countdown = 60;

  updateCountdownUI();
});
// UPDATE UI
function updateCountdownUI() {
  const hours = Math.floor(countdown / 3600);

  const minutes = Math.floor((countdown % 3600) / 60);

  const seconds = countdown % 60;

  countdownH.textContent = String(hours).padStart(2, "0");

  countdownM.textContent = String(minutes).padStart(2, "0");

  countdownS.textContent = String(seconds).padStart(2, "0");
}

const timeInputs = [inputHours, inputMinutes, inputSeconds];

timeInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 2);
  });
});
