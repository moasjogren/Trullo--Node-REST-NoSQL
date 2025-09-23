import express from "express";

import { connectDB } from "./config/db";
import { PORT } from "./config/variables";

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(console.error);
