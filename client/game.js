import Phaser, { Game } from "phaser";
import { MainGame } from "./scenes/MainGame";
import { Preloader } from "./scenes/Preloader";
import { GAME_CONTAINER_ID, stateInit } from "./state";

stateInit();

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	scale: {
		parent: GAME_CONTAINER_ID,
		mode: Phaser.Scale.RESIZE,
		min: {
			width: 800,
			height: 600,
		},

		zoom: 1, // Size of game canvas = game size * zoom
	},
	autoRound: false,
	scene: [Preloader, MainGame],
};

export default new Game(config);
