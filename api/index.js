const app = require('./app');
const connectDB = require('./config/db');
const { server } = require('./sockets/socket');

const PORT = process.env.PORT || 8000;

connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});