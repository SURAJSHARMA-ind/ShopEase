import express from "express"
import cors from "cors"
const hostname = "localhost";
import product from "./products"
const port = 4000;
const app = express();
import authRoutes from './routes/auth'
const mongoose = require("mongoose")

const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello This is custom API ");
});
app.get("/products", (req, res) => {
  res.send(products);
});

app.use("/auth", authRoutes); 

app.listen(port, () => {
  console.log(`Server is listening at : http://${hostname}:${port}/`);
});
