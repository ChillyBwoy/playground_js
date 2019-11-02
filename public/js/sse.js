let eventSource

function log(...msg) {
  console.log(...msg);
}

const handleOpen = (e) => {
  log("open");
};

const handleError = (e) => {
  log("Error");
  // if (this.readyState == EventSource.CONNECTING) {
  //   log(`Переподключение (readyState=${this.readyState})...`);
  // } else {
  //   log("Error");
  // }
};

const handleMessage = (e) => {
  log('message:', e.data);
};

const handleBuy = (e) => {
  log('buy:', e.data);
};

document.getElementById('start').addEventListener('click', () => {
  eventSource = new EventSource('http://localhost:8080/digits');
  eventSource.addEventListener('open', handleOpen);
  eventSource.addEventListener('error', handleError);
  eventSource.addEventListener('bye', handleBuy);
  eventSource.addEventListener('message', handleMessage);
});

document.getElementById('stop').addEventListener('click', () => {
  eventSource.close();
  eventSource.removeEventListener('open', handleOpen);
  eventSource.removeEventListener('error', handleError);
  eventSource.removeEventListener('bye', handleBuy);
  eventSource.removeEventListener('message', handleMessage);
  log("connection closed");
});
