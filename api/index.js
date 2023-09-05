const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRouter = require("./routes/user");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const db_link =
  "mongodb+srv://username:GPieCQJadTvab603@cluster0.u8hoqny.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(() => {
    console.log(" user db connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.listen(8800, () => {
  console.log("backend server running");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
