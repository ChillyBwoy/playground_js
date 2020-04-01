/**
 * Смоделировать ситуацию, при которой на сервер подряд уходит несколько однотипных запросов
 * и сервер возвращает ответ на каждый запрос с произвольной задержкой. Необходимо правильно
 * обносить UI
 */

const SERVER_URL = 'http://localhost:3000/race';

const $result = document.getElementById('result');
const $query = document.getElementById('query');

let query = '';

$result.innerText = '...';

async function makeRequest(query) {
  const response = await fetch(`${SERVER_URL}?q=${query}`);
  const json = await response.json();
  return json;
}

function defferRequest(q, timeout = 0) {
  return function deffered() {
    return new Promise(resolve => {
      setTimeout(() => {
        query = q;
        $query.innerText = query;
        resolve(makeRequest(q));
      }, timeout);
    });
  }
}

const requests = [
  defferRequest('re', 0),
  defferRequest('requ', 250),
  defferRequest('request', 500),
  defferRequest('request and', 750),
  defferRequest('request and await', 1000),
  defferRequest('brand new request', 3000),
  defferRequest('another request', 3250),
];

requests.map((r) => {
  r().then((data) => {
    const key = data.query.q;

    console.log(query === key ? '✅' : '❌', key);

    if (query === key) {
      $result.innerText = data.query.q;
    }
  });
});




