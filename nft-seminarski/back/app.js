const express = require("express");
const morgan = require("morgan");
const AppError = require("./Utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");
const nftsRouter = require("./routes/nftsRoute");
const usersRouter = require("./routes/usersRoute");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
//SERVING TEMPLATE DEMO
app.use(express.static(`${__dirname}/nft-data/img`));
//CUSTOM MIDDLE WARE
app.use((req, res, next) => {
  console.log("Midlver omotac 👋");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Nije moguce naci ${req.originalUrl} na serveru`,404));
});
//global
app.use(globalErrorHandler);


module.exports = app;