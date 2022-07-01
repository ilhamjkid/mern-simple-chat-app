import fs from "fs";
import path from "path";

import rootDir from "./rootDir.js";

// Check if log folder not exists
const logFolder = path.join(rootDir, "logs");
if (!fs.existsSync(logFolder)) fs.mkdirSync(logFolder);

// Check if log file not exists
const logFile = path.join(rootDir, "logs", "access.log");
if (!fs.existsSync(logFile)) fs.writeFileSync(logFile, "");

export default fs.createWriteStream(logFile, { flags: "a" });
