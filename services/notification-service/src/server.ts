import app from './app';
import http from 'http';

const PORT = process.env.PORT

const server = http.createServer(app);


server.listen(PORT, () => {
  console.log(`Notification Service is running on port ${PORT}`);
});