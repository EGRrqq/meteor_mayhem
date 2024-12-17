import { io } from "socket.io-client";

const socket = io();

/** @type {TPlayers | null} */
export let players;
/** @type {boolean} */
let resizeFlag = false;
export const getResizeFlag = () => resizeFlag;
/** @type {string} */
export const GAME_CONTAINER_ID = "game-container";

export const stateInit = () => {
	// on event
	socket.on("players", (data) => {
		players = data;
	});

	// emit event
	/** @type {(gameContainerId: string) => void} */
	const gameResize = (id) => {
		const windowObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				/** @type {ISize} */
				const size = {
					h: entry.contentRect.height,
					w: entry.contentRect.width,
				};
				resizeFlag = true;
				socket.emit("game-resize", size);
			}
			resizeFlag = false;
		});

		const gameContainerEl = document.getElementById(id);
		if (!(gameContainerEl instanceof HTMLElement))
			throw new Error(`container element with id: "${id}" not found`);

		windowObserver.observe(gameContainerEl);
	};

	gameResize(GAME_CONTAINER_ID);
};
