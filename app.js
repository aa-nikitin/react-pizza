const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const PORT = config.get('port') || 5000;

app.use('/api', require('./routes/pizzas.routes'));
app.use('/files', express.static(path.join(__dirname, 'files')));

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`server has been stared on port ${PORT}... `));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
