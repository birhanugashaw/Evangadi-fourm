require("dotenv").config();
const pool = require("./server/config/database");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const questionRouter = require("./server/api/questions/question.router");
const userRouter = require("./server/api/users/user.router");
const answerRouter = require("./server/api/answers/answer.router");

app.use("/api/users", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);

app.listen(process.env.PORT || 4000, () =>
  console.log(`listening at http://localhost:${process.env.PORT || 4000}`)
);

