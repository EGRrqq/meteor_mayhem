import { createServer } from "node:http";
import { join } from "node:path";
import express from "express";
import morgan from "morgan";

const app = express();
const server = createServer(app);

const PORT = 1234;
const rootDir = process.cwd();

app.use(morgan("dev"));
app.use(express.static(join(rootDir, "public")));

server.listen(PORT, () => {
	console.log(`Server listening: http://localhost:${PORT}/`);
});
