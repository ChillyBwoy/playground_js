const $root = document.getElementById('main');
const $log = document.getElementById('log');

function messageTemplate(msg) {
  const $el = document.createElement('li');
  $el.innerText = msg;
  return $el;
}

function commonEvent(event, callback) {
  const { target } = event;
  if (target.classList.contains('inner')) {
    const id = target.dataset.id
    callback(id);
  }
}

const logClick = (id) => {
  const newMsg = messageTemplate(`Clicked: "${id}"`);
  $log.appendChild(newMsg);
};

const logMouseEnter = (id) => {
  const newMsg = messageTemplate(`Mouse enter: "${id}"`);
  $log.appendChild(newMsg);
};

const logMouseLeave = (id) => {
  const newMsg = messageTemplate(`Mouse leave: "${id}"`);
  $log.appendChild(newMsg);
};

const handleClick = (event) => {
  console.log(event);
  commonEvent(event, logClick);
};

const handleMouseEnter = (event) => {
  commonEvent(event, logMouseEnter);
};
const handleMouseLeave = (event) => {
  commonEvent(event, logMouseLeave);
};

$root.addEventListener('click', handleClick);
$root.addEventListener('mouseenter', handleMouseEnter, true);
$root.addEventListener('mouseleave', handleMouseLeave, true);
$root.addEventListener('test', (event) => {
  console.log('==>', event);
});

let testClickEvent = new Event('click', { bubbles: true });
let testClickMouseEvent = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});
let testEvent = new CustomEvent('test', {
  detail: {
    a: 1,
    b: 2,
  }
})

$root.dispatchEvent(testClickEvent);
$root.dispatchEvent(testClickMouseEvent);
$root.dispatchEvent(testEvent);
