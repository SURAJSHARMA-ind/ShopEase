import express from "express";
import cors from "cors";
import products from "./products";
import authRoutes from './routes/userAuth';
import adminRoutes from "./routes/adminRoutes";
import productsRoutes from "./routes/products";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello This is custom API ");
});

app.get("/products", (req, res) => {
  res.send(products);
});

// API routes
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/products", productsRoutes);

export default app;
