import { Scene } from "phaser";

// load assets
export class Preloader extends Scene {
	constructor() {
		super("Preloader");
	}

	init() {}

	create() {
		this.scene.start("MainGame");
	}
}
