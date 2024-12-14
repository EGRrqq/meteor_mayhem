import { Scene } from "phaser";

/** @typedef {"keyW" | "keyS" | "keyD" | "keyA"} TKeysMap */
/** @typedef {Record<TKeysMap, Phaser.Input.Keyboard.Key | undefined>} TKeys */
/** @typedef {Record<TKeysMap, () => void>} TKeyActions */

export class MainGame extends Scene {
	/** @type {TKeysMap[]} */
	keysMap = ["keyW", "keyS", "keyA", "keyD"];

	/** @type {TKeys} */
	keys = {
		keyW: undefined,
		keyS: undefined,
		keyA: undefined,
		keyD: undefined,
	};

	/** @type {TKeyActions} */
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
		// set person
		this.person = this.add.rectangle(
			this.personData.x,
			this.personData.y,
			this.personData.w,
			this.personData.h,
			0x00ff00,
		);

		// set keys
		/** @type {Record<TKeysMap, number>} */
		const k = {
			keyW: Phaser.Input.Keyboard.KeyCodes.W,
			keyS: Phaser.Input.Keyboard.KeyCodes.S,
			keyA: Phaser.Input.Keyboard.KeyCodes.A,
			keyD: Phaser.Input.Keyboard.KeyCodes.D,
		};
		this.keys = /** @type {TKeys} */ (this.input.keyboard?.addKeys(k));
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
