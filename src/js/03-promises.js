import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const stepDelay = Number(stepEl.value);
  let delayValue = Number(delayEl.value);
  let amountCounter = 0;

  const intervalId = setInterval(() => {
    amountCounter += 1;
    if (amountEl.value < amountCounter) {
      clearInterval(intervalId);
      return;
    }
    createPromise(amountCounter, delayValue)
      .then(createSuccessMessage)
      .catch(createErrorMessage);
    delayValue += stepDelay;
  }, stepDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function createSuccessMessage(result) {
  Notify.success(result);
}
function createErrorMessage(error) {
  Notify.failure(error);
}
