const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const productRoute = require("./Routers/productRoute.js");
const userRoute = require("./Routers/userRoute.js");
const connectDB = require("./Config/databaseConfig.js");
app.use(express.json());
app.use("/products", productRoute);
app.use("/users", userRoute);
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
