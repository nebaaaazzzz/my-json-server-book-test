import express from "express";
import mainRouter from "./routes/index.route";
import { errorHandler } from "./helpers/errorHandler";
import dbconnection from "./config/db";
dbconnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }

  const app = express();
  app.use(express.json());
  app.use("/", mainRouter);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("Connected to the database!");
    console.log(`Server is running. ${PORT}`);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.log(`Unhandled Rejection at: ${reason} ${promise}`);
  });
  process.on("uncaughtException", (error) => {
    console.log(`Uncaught Exception at: ${error}`);
    process.exit(1);
  });
  process.on("SIGTERM", () => {
    console.log(`SIGTERM`);
    process.exit(0);
  });
  process.on("SIGINT", () => {
    console.log(`SIGINT`);
    process.exit(0);
  });
});
