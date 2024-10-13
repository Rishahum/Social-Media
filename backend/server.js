const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the application');
  });

app.use('/api/auth', require('./routes/auth'));
app.use('/api/friend', require('./routes/friend'));
app.use('/api/posts', require('/router/post'));
app.use('/api/feed', require('/router/feed'));



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
