import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import products from "./products"
import authRoutes from './routes/auth'
import adminRoutes from "./routes/adminRoutes"


const app = express();
const connectionString = process.env.MONGODB_URI;
const port =  process.env.PORT || 4000;
const hostname =  process.env.HOST_NAME || "localhost";

if (!connectionString) {
  throw new Error("Mongo Uri missing ")
}
mongoose.connect(connectionString);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello This is custom API ");
});

app.get("/products", (req, res) => {
  res.send(products);
});
// User signup & Signin route
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Server is listening at : http://${hostname}:${port}/`);
});
