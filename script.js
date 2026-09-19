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
