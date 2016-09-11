import express from 'express';
import _http from 'http';

const app = express();
const http = _http.Server(app);
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
http.listen(3000, () => {
  console.log('listening on *:3000');
});
