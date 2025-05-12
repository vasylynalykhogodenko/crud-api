import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api", userRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
