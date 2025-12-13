import { config } from "dotenv";

config({ path: "./src/config/config.env" });

import http from "node:http";
import app from "./app.js";
import connectToDB from "./db/db.js";
import { initSocket } from "./sockets/socket.js";

const server = http.createServer(app);
connectToDB();
initSocket(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`⚙ Server running on PORT ${PORT}.`);
});
