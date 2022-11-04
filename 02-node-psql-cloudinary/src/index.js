const http = require('http');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.SERVER_PORT || 3000;

app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});