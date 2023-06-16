const express = require("express");
const path = require('path');
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
const dotenv = require("dotenv").config();
// const contractRouter = require("./routes/contactRouter");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

const app = express();

const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use(express.urlencoded({extended: false}))

// app.use(cors())

app.use("/contacts", require("./routes/contactRouter"));

app.listen(PORT, () => {
  console.log(`The server is running at port: ${PORT}`);
});
