const express = require("express");
const dotenv = require("dotenv");
const color = require("colors");
const morgan = require("morgan");
dotenv.config();
const connectDB = require("./config/db.js");




const app = express();
const PORT = process.env.PORT;

// middlewares 
app.use(morgan("dev"));
app.use(express.json());

// routes
const userRoutes = require("./routes/userRoutes.js");


//base route : http://localhost:5000/ 
//routes path
app.use("/api/v1/user" , userRoutes);



app.listen(PORT, () => {
  console.log(`The Server is running on Port: ${PORT} `.blue.bgWhite.underline);
  connectDB();
});
app.get("/", (req, res) => {
  res.send("Hello EveryOne checking server");
});
