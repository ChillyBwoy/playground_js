const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const USERS = require('./src/json/data1.json');

app.get('/api/users', (req, res) => {
  res.json({
    count: USERS.length,
    data: USERS,
  });
});

app.post('/api/users', (req, res) => {
  const { first_name, last_name } = req.body;
  console.log(req.body)
  const last = USERS.slice(-1)[0];
  const newUser = {
    first_name,
    last_name,
    id: last.id + 1,
  };
  USERS.push(newUser);
  res.json({
    data: newUser,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
