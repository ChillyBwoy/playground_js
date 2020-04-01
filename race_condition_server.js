const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/race', (req, res) => {
  const timeout = Math.random() * 2000;
  setTimeout(() => {
    res.json({
      ok: 'ok',
      query: req.query,
    });
  }, timeout);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
