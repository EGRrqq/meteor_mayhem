import { createServer } from "node:http";
import { join } from "node:path";
import express from "express";
import morgan from "morgan";
import { Server } from "socket.io";
import "../declarations/index.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 1234;
const rootDir = process.cwd();
const publicDir = join(rootDir, "public");

app.use(morgan("dev"));
app.use(express.static(publicDir));

/** @type {TPlayers}*/
const players = {};
/** @type {boolean} */
let initFlag = true;
/** @type {boolean} */
let resizeFlag = false;
/** @type {ISize} */
const windowSize = {
	w: 0,
	h: 0,
};
/** @type {ISize} */
const prevWindowSize = {
	h: 0,
	w: 0,
};

/** @type{ IPoint } */
const playerPos = {
	x: 0,
	y: 0,
};

/** @type{() => void} */
const calcInitPlayerPos = () => {
	playerPos.x = Math.floor(
		Math.randomArbitrary(windowSize.w / 4, windowSize.w / 1.5),
	);
	playerPos.y = Math.floor(
		Math.randomArbitrary(windowSize.h / 4, windowSize.h / 1.5),
	);
};

/** @type{number} */
const playerColor = Number.parseInt(
	`0x${Math.floor(Math.randomArbitrary(0, 9))}${Math.floor(Math.randomArbitrary(0, 9))}ff${Math.floor(Math.randomArbitrary(0, 9))}${Math.floor(Math.randomArbitrary(0, 9))}`,
);

io.on("connection", (socket) => {
	console.log("connected");

	players[socket.id] = {
		data: {
			size: {
				h: 50,
				w: 50,
			},
			pos: playerPos,
			color: playerColor,
		},
	};

	socket.on("game-resize", (size) => {
		resizeFlag = true;
		windowSize.h = size.h;
		windowSize.w = size.w;

		if (initFlag) {
			console.log("init section");
			initFlag = false;
			calcInitPlayerPos();

			prevWindowSize.h = size.h;
			prevWindowSize.w = size.w;

			socket.emit("players", players);
		} else {
			const dh = windowSize.h - prevWindowSize.h;
			const dw = windowSize.w - prevWindowSize.w;

			prevWindowSize.h = size.h;
			prevWindowSize.w = size.w;

			// socket update pos
			// if new pos >0 && < window size
			//players[socket.id].data.pos.x += dw / 2;
			//players[socket.id].data.pos.y += dh / 2;
			//else magnet to the closest siede

			console.log("update section");
			//socket.emit("players", players);
			console.log({ dh, dw });
		}

		console.log(players);
		resizeFlag = false;
	});

	if (!initFlag && !resizeFlag) {
		socket.emit("players", players);
	}

	socket.on("disconnect", () => {
		console.log("disconnected");

		delete players[socket.id];
	});
});

server.listen(PORT, () => {
	console.log(`Server listening: http://localhost:${PORT}/`);
});
