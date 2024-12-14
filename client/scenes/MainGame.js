import { Scene } from "phaser";

/** @typedef {"keyW" | "keyS" | "keyD" | "keyA"} keysMap */

export class MainGame extends Scene {
	/** @type {keysMap[]} */
	keysMap = ["keyW", "keyS", "keyA", "keyD"];

	/** @type {Record<keysMap, Phaser.Input.Keyboard.Key | undefined>} */
	keys = {
		keyW: undefined,
		keyS: undefined,
		keyA: undefined,
		keyD: undefined,
	};

	/** @type {Record<keysMap, () => void>} */
	keyActions = {
		keyW: () => {
			this.personData.y -= 1;
			this.person?.setY(this.personData.y);
		},
		keyS: () => {
			this.personData.y += 1;
			this.person?.setY(this.personData.y);
		},
		keyA: () => {
			this.personData.x -= 1;
			this.person?.setX(this.personData.x);
		},
		keyD: () => {
			this.personData.x += 1;
			this.person?.setX(this.personData.x);
		},
	};

	/** @type { IPoint & ISize  }*/
	personData = {
		x: 250,
		y: 250,
		w: 50,
		h: 50,
	};
	/** @type {Phaser.GameObjects.Rectangle | null }*/
	person = null;

	constructor() {
		super("MainGame");
	}

	init() {
		this.person = this.add.rectangle(
			this.personData.x,
			this.personData.y,
			this.personData.w,
			this.personData.h,
			0x00ff00,
		);
		//this.person.setInteractive();

		// set keys
		this.keys.keyW = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.W,
		);
		this.keys.keyS = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.S,
		);
		this.keys.keyA = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.A,
		);
		this.keys.keyD = this.input.keyboard?.addKey(
			Phaser.Input.Keyboard.KeyCodes.D,
		);
	}

	update() {
		for (const key of this.keysMap) {
			if (this.keys[key]?.isDown) {
				this.keyActions[key]();
				break;
			}
		}
	}
}
