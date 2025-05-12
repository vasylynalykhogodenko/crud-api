import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = parseInt(process.env.PORT || "4000", 10);
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process running on PID: ${process.pid}`);
  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} exited. Spawning a new one...`);
    cluster.fork();
  });
} else {
  app.listen(PORT + cluster.worker!.id, () => {
    console.log(
      `Worker ${cluster.worker!.id} running on port ${PORT + cluster.worker!.id}`
    );
  });
}
