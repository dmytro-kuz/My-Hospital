const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const router = require("./routes");

const app = express();
const MONGODB_URL ="mongodb+srv://doctorsApi:6t8qTCDaUHo93bdZ@cluster0.x8t9jj5.mongodb.net/doctorslists?retryWrites=true&w=majority";
const PORT = 3000;

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Could not connect to DB"));

app.use(cors());
app.use(express.json());

//routes

app.use("/api", require("./routes"));

// listening server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
