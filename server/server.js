import { config } from "dotenv";
config({ path: "./src/config/config.env" });

import app from "./src/app.js";
import connectToDB from "./src/db/db.js";
connectToDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`⚙ Server running on PORT ${PORT}.`);
});
