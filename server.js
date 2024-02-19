const express = require('express');
const cors = require('cors');
const { authRouter } = require('./src/routes/userRoutes');

const app = express();
app.use(cors());

app.use(express.json());
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});

app.use('/users', authRouter);
