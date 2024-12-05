const express = require("express");
const morgan = require("morgan");
const AppError = require("./api/Utils/appError")
const globalErrorHandler = require("./api/controllers/errorControllers");
const nftsRouter = require("./api/routes/nftsRoute");
const usersRouter = require("./api/routes/usersRoute");
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

app.use("/v1/nfts", nftsRouter);
app.use("/v1/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Nije moguce naci ${req.originalUrl} na serveru`,404));
});
//global
app.use(globalErrorHandler);


module.exports = app;