import Phaser, { Game } from "phaser";
import { Preloader } from "./scenes/Preloader";

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	scale: {
		parent: "game-container",
		mode: Phaser.Scale.RESIZE,
		min: {
			width: 800,
			height: 600,
		},

		zoom: 1, // Size of game canvas = game size * zoom
	},
	autoRound: false,
	scene: [Preloader],
};

export default new Game(config);
