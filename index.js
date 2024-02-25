// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.urlencoded())

app.use('/', require("./routes"))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;