import app from './app';
import http from 'http';

const server = http.createServer(app);


server.listen(3000, () => {
  console.log(`Notification Service is running on port 3000`);
});