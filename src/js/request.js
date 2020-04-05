(function () {
  const API_URL = 'http://localhost:3000/api';

  const $table = document.getElementById('userlist');
  const $form = document.getElementById('userform');

  function request(method, url, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${API_URL}${url}`);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
          case 0: {
            // UNSENT
            break;
          }
          case 1: {
            // OPENED
            break;
          }
          case 2: {
            // HEADERS_RECEIVED
            break;
          }
          case 3: {
            // LOADING
            break;
          }
          case 4: {
            // DONE
            if (xhr.status >= 200 && xhr.status < 300) {
              const json = JSON.parse(this.responseText);
              resolve(json);
            } else {
              console.warn(this.responseText);
              reject();
            }
            break;
          }
        }
      };
      xhr.send(data);
    });

    // fetch(`${API_URL}/users`, {
    //   credentials: 'same-origin',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(r => r.json())
    //   .then(console.log);
  }

  function userTemplate(user) {
    const $tr = document.createElement('tr');
    const $frag = document.createDocumentFragment();

    for (let key of ['id', 'first_name', 'last_name']) {
      const $td = document.createElement('td');
      $td.innerText = user[key];
      $frag.appendChild($td);
    }

    $tr.appendChild($frag);
    return $tr;
  }

  function userUpdateTable(users) {
    const $tbody = $table.tBodies[0];
    $tbody.innerHTML = '';
    const $frag = document.createDocumentFragment();

    for (let user of users) {
      $frag.appendChild(userTemplate(user));
    }

    $tbody.appendChild($frag);
    $table.appendChild($tbody);
  }

  function fetchUsers() {
    return request('GET', '/users')
      .then(response => {
        console.log('fetchUsers', response);
        userUpdateTable(response.data);
      });
  }

  function createUser(first_name, last_name) {
    const payload = { first_name, last_name };
    console.log(payload);
    return request('POST', '/users', JSON.stringify(payload))
  }

  $form.addEventListener('submit', event => {
    event.preventDefault();
    const fName = $form.elements.first_name.value;
    const lName = $form.elements.last_name.value;

    createUser(fName, lName)
      .then(response => {
        console.log('createUser', response);
        fetchUsers();
      });
  });

  fetchUsers();
}());