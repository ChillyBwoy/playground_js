import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

(function () {

  function myDebounce(f, wait, immediate) {
    let timer = null;

    function wrapped(...args) {
      const context = this;

      if (immediate && timer === null) {
        f.apply(context, args);
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        f.apply(context, args);
      }, wait);
    }

    wrapped.cancel = () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };

    return wrapped;
  }

  function myThrottle(fn, wait) {
    let timer = null;
    let lastCall = null;

    return function throttleWrapper(...args) {
      const context = this;
      const now = Date.now();

      if (lastCall !== null && now < (lastCall + wait)) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          lastCall = now;
          fn.apply(context, args);
        }, wait);
      } else {
        lastCall = now;
        fn.apply(context, args);
      }
    }
  }

  const $test1 = document.getElementById('test1');
  const $test2 = document.getElementById('test2');
  const $test3 = document.getElementById('test3');
  const $test4 = document.getElementById('test4');

  const handleMouseMove = (msg) => (event) => {
    console.log(`${msg}: [${event.clientX}, ${event.clientY}]`);
  };

  const handleMouseMoveDebounced = debounce(handleMouseMove('debounce'), 100);
  const handleMouseMoveCustomDebounced = myDebounce(handleMouseMove('custom debounce'), 100);
  const handleMouseMoveThrottled = throttle(handleMouseMove('throttle'), 500);
  const handleMouseMoveCustomThrottled = myThrottle(handleMouseMove('custom throttle'), 500);

  $test1.addEventListener('mousemove', handleMouseMoveDebounced);
  $test2.addEventListener('mousemove', handleMouseMoveCustomDebounced);
  $test3.addEventListener('mousemove', handleMouseMoveThrottled);
  $test4.addEventListener('mousemove', handleMouseMoveCustomThrottled);
}());