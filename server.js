const express = require('express');
const cors = require('cors-anywhere');

const app = express();

// Set whitelist for origins
const whitelist = ['hataken999.github.io', '192.168.1.4:8080'];

// Set whitelist for IP addresses
const whitelistIP = ['103.144.175.195'];

// Set CORS options
const corsOptions = {
  origin: (origin, callback) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (whitelist.indexOf(origin) !== -1) {
      if (whitelistIP.indexOf(ip) !== -1) {
        callback(null, true);
      }
    } else {
      callback(new Error('Your IP Address is not allowed to use this proxy!'));
    }
  }
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (whitelistIP.indexOf(ip) !== -1) {
    res.send('Selamat datang, Hataken999!');
  } else {
    res.send('Proxy hanya dapat digunakan oleh Hataken999!');
  }
});

app.get('*', (req, res) => {
  res.send('Route salah! Silahkan kembali ke main route.');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`CORS proxy server is listening on port ${port}`);
});
