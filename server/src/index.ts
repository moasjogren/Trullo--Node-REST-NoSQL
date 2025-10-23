import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT: any = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

connectDB()
  .then(() => {
    app.get("/", (_req, res) => {
      res.send("Hello from server");
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(console.error);
