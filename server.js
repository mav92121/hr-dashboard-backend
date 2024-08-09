import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import "./database/dbConfig.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
