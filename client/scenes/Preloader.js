import { Scene } from "phaser";

export class Preloader extends Scene {
	constructor() {
		super("Preloader");
	}

	create() {
		this.add.rectangle(100, 100, 50, 50, 0x00ff00);
	}
}
