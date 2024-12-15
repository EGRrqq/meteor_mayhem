import { createServer } from "node:http";
import { join } from "node:path";
import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 1234;
const rootDir = process.cwd();

app.use(morgan("dev"));
app.use(express.static(join(rootDir, "public")));

io.on("connection", (s) => {
	console.log("connected");

	s.on("disconnect", () => {
		console.log("disconnected");
	});
});

server.listen(PORT, () => {
	console.log(`Server listening: http://localhost:${PORT}/`);
});
