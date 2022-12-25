const express = require('express');
const cors = require('cors-anywhere');

const app = express();

app.use(cors());

app.get('/:url', (req, res) => {
  const { url } = req.params;
  cors.forward(req, res, url);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`CORS proxy server is listening on port ${port}`);
});
