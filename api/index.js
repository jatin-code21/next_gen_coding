const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});