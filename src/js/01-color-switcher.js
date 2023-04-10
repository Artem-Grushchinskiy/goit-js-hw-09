function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);
let interval;
btnStop.disabled = true;
btnStart.addEventListener(`click`, changeMyColor);
function changeMyColor(event) {
  interval = setInterval(clb, 1000);
  function clb() {
    document.body.style.backgroundColor = getRandomHexColor();
  }
  btnStop.disabled = false;
  btnStart.disabled = true;
}
btnStop.addEventListener(`click`, stopChangeColor);
function stopChangeColor(event) {
  clearInterval(interval);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
