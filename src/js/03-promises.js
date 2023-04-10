const form = document.querySelector(`.form`);
const firstDelay = document.querySelector(`[name="delay"]`);
const delayStep = document.querySelector(`[name="step"]`);
const amount = document.querySelector(`[name="amount"]`);

form.addEventListener(`submit`, submitPromises);
function submitPromises(e) {
  e.preventDefault();
  let delay = firstDelay.valueAsNumber;
  const delayStepValue = delayStep.valueAsNumber;
  const amountValue = amount.valueAsNumber;

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += delayStepValue;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
