const express = require("express");
const app = express();
const productRoute = require("./Routers/productRoute.js");
const connectDB = require("./Config/databaseConfig.js");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use("/products", productRoute);
connectDB();


app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
