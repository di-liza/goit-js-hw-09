import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[ data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectDate = null;
let intervalId = null;
let deltaTime = 0;
let currentDate = null;

startBtn.addEventListener('click', timerCreate);
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getSelectedDate(selectedDates);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function getSelectedDate(selectedDates) {
  if (selectedDates[0] > Date.now()) {
    selectDate = selectedDates[0].getTime();
    clearInterval(intervalId);
    startBtn.disabled = false;
    Notify.info('Press Start');
    return;
  }
  Report.failure('Please, choose a date in the future');
}

function timerCreate() {
  const isActive = false;
  intervalId = setInterval(() => {
    startBtn.disabled = true;
    currentDate = new Date().getTime();

    if (selectDate - currentDate < 1000) {
      clearInterval(intervalId);
      Report.success('Congratulations, timer completed!');
      startBtn.disabled = false;
      return;
    } else {
      currentDate += 1000;
      deltaTime = Math.floor(selectDate - currentDate);
      const time = convertMs(deltaTime);
      updateClockface(time);
    }
  }, 1000);
}
