import { config } from "dotenv";
config({ path: "./src/config/config.env" });

import http from "http";
import app from "./src/app.js";
import connectToDB from "./src/db/db.js";
import { initSocket } from "./src/sockets/socket.js";

const server = http.createServer(app);
connectToDB();
initSocket(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`⚙ Server running on PORT ${PORT}.`);
});
