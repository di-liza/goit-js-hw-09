function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');

const stopBtn = document.querySelector('[data-stop');
stopBtn.disabled = true;

let intervalId = null;
let isActive = false;

startBtn.addEventListener('click', () => {
  isActive = true;
  if (isActive) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
});
