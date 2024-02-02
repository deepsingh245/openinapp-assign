const express = require("express");
const app = express();
const port = 3000;
const mongoDB = require("./db");
mongoDB();
app.use(express.json());

app.use("/", require("./task"));
app.use("/", require("./userCreate"));
app.use("/", require("./sub-task"));
// app.use("/", require("./twilio"));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });