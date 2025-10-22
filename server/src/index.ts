import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import { PORT } from "./config/variables";

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

connectDB()
  .then(() => {
    app.get("/", (_req, res) => {
      res.send("Hello from server");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(console.error);
