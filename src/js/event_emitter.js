class EventEmitter {
  constructor() {
    this.listeners = {};

    this.addListener = this.on.bind(this);
    this.removeListener = this.off.bind(this);
  }

  count(eventName) {
    let fns = this.listeners[eventName] || [];
    return fns.length;
  }

  once(eventName, fn) {
    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    }

    this.on(eventName, onceWrapper);
    return this;
  }

  on(eventName, subscriber) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(subscriber);
    return this;
  }

  off(eventName, subscriber) {
    if (!this.listeners[eventName]) {
      return this;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(s => s !== subscriber);
    return this;
  }

  emit(eventName, ...args) {
    const callbacks = this.listeners[eventName] || [];
    if (callbacks.length === 0) {
      return;
    }

    callbacks.forEach(fn => {
      fn(...args);
    });

    return true;
  }
}

const myEmitter = new EventEmitter();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be 
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.count('event1'));
