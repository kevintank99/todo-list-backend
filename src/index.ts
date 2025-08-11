import express from "express";
import config from "./config";
import { initializeDatabase } from "./db";
import routes from "./routes";
import { scheduleTodoCron } from "./jobs/todoCron";  // import your cron scheduler



const app = express();
const PORT = config.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use(`/${config.VERSION}/api`, routes);

// Start server
const startServer = async () => {
  try {
    await initializeDatabase();

    // Start the cron job here, after DB is ready
    scheduleTodoCron();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    // startExpireTodosJob();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
