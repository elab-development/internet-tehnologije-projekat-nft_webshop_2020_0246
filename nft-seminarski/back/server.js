const dotenv = require("dotenv");
const mongoose = require("mongoose")
const app = require("./app");

dotenv.config({ path: "./config.env" });
// Replace <PASSWORD> with actual password
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this to avoid connection warnings
  })
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch((err) => {
    console.error("DB Connection Error: ", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});