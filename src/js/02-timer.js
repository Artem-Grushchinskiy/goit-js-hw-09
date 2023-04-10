import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const btnStart = document.querySelector(`[data-start]`);
btnStart.disabled = true;
let curentTime;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    curentTime = selectedDates[0];
    if (selectedDates[0] > Date.now()) {
      btnStart.disabled = false;
      console.log(selectedDates[0]);
    } else {
      btnStart.disabled = true;
      alert("Please choose a date in the future");
    }
  },
};
flatpickr("#datetime-picker", options);
btnStart.addEventListener(`click`, onTimerStart);
function onTimerStart(event) {
  let interval = setInterval(deferenceTime, 1000);
  btnStart.disabled = true;

  function deferenceTime() {
    let deference = curentTime - Date.now();
    renderTime(convertMs(deference));

    if (deference < 1000) {
      clearInterval(interval);
    }
  }
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const ddInMyPage = document.querySelector(`[data-days]`);
const hoInMyPage = document.querySelector(`[data-hours]`);
const minInMyPage = document.querySelector(`[data-minutes]`);
const secInMyPage = document.querySelector(`[data-seconds]`);
function renderTime(myTime) {
  ddInMyPage.textContent = addLeadingZero(myTime.days);
  hoInMyPage.textContent = addLeadingZero(myTime.hours);
  minInMyPage.textContent = addLeadingZero(myTime.minutes);
  secInMyPage.textContent = addLeadingZero(myTime.seconds);
}
function addLeadingZero(value) {
  return `${value}`.padStart(2, `0`);
}
