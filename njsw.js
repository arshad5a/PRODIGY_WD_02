let timer;
let isRunning = false;
let milliseconds = 0,
  seconds = 0,
  minutes = 0;
let laps = [];

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById('startStopBtn').textContent = 'Start';
    isRunning = false;
  } else {
    timer = setInterval(updateTime, 10);
    document.getElementById('startStopBtn').textContent = 'Stop';
    isRunning = true;
  }
}

function updateTime() {
  milliseconds += 10;

  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }

  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  document.getElementById('display').textContent = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds / 10)}`;
}

function padTime(val) {
  return val < 10 ? `0${val}` : val;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  laps = [];
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('startStopBtn').textContent = 'Start';
}

function lap() {
  if (isRunning) {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds / 10)}`;
    laps.push(lapTime);
    displayLaps();
  }
}

function displayLaps() {
  const lapContainer = document.createElement('div');
  lapContainer.classList.add('laps-container');
  laps.forEach((lap, index) => {
    const lapDiv = document.createElement('div');
    lapDiv.textContent = `Lap ${index + 1}: ${lap}`;
    lapContainer.appendChild(lapDiv);
  });
  document.body.appendChild(lapContainer);
}

function resetLaps() {
  laps = [];
  const lapContainers = document.querySelectorAll('.laps-container');
  lapContainers.forEach(container => {
    container.remove();
  });
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'p' || event.key === 'P') {
    startStop();
  } else if (event.key === 'r' || event.key === 'R') {
    reset();
  } else if (event.key === 'l' || event.key === 'L') {
    lap();
  } else if (event.key === 'e' || event.key === 'E') {
    resetLaps();
  }
});
