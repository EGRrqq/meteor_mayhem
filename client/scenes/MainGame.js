import { Scene } from "phaser";
import { getResizeFlag, players } from "../state";

export class MainGame extends Scene {
	/** @type {Record<string, Phaser.GameObjects.Rectangle >}*/
	rects = {};

	constructor() {
		super("MainGame");
	}

	preload() {}
	init() {}

	update() {
		// render persons
		for (const id in players) {
			this.rects[id] = this.add.rectangle(
				players[id].data.pos.x,
				players[id].data.pos.y,
				players[id].data.size.w,
				players[id].data.size.h,
				players[id].data.color,
			);
		}
		console.log({ rects: this.rects, players });
	}
}
