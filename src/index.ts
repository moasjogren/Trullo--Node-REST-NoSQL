import express from "express";

import { connectDB } from "./config/db";
import { PORT } from "./config/variables";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      //   console.log(new Date().toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "));
    });
  })
  .catch(console.error);
