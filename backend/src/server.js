import express from "express";
import notesRoutes from "./rotues/notesRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
{
  /*
  //simple middleware
  app.use((req, res, next) => {
  console.log(`req mtd ${req.method}&${req.url}`);
}); */
}
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is runinng on port : http://localhost:${PORT}`);
  });
});
