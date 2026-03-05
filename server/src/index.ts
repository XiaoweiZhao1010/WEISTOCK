import express from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* ROUTE IMPORTS */
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
/* CONFIGURATIONS */
dotenv.config({ quiet: true });
const app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

/* ROUTES */
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);
/* SERVER SETUP */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
