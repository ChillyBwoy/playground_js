const KEY = 'ravevalue';
const $button = document.getElementById('play');

$button.addEventListener('click', () => {
  let now = Date.now();
  document.title = `playing...${now}`;
  $button.innerHTML = `playing...${now}`;
  localStorage.setItem(KEY, now);
});

function dispatch() {
  let value = localStorage.getItem(KEY);

  if (value) {
    const stamp = parseInt(value, 10);
    document.title = `Playground`;
    $button.innerHTML = `play`;
  }
}
window.addEventListener('storage', dispatch);

