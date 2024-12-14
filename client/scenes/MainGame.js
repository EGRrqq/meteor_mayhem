import { Scene } from "phaser";

/** @typedef {object} IPersonData
 * @property {IPoint} pos
 * @property {ISize} size
 * */

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
			this.personData.pos.y -= 1;
			this.person?.setY(this.personData.pos.y);
		},
		keyS: () => {
			this.personData.pos.y += 1;
			this.person?.setY(this.personData.pos.y);
		},
		keyA: () => {
			this.personData.pos.x -= 1;
			this.person?.setX(this.personData.pos.x);
		},
		keyD: () => {
			this.personData.pos.x += 1;
			this.person?.setX(this.personData.pos.x);
		},
	};

	/** @type {IPersonData}*/
	personData = {
		pos: {
			x: 250,
			y: 250,
		},
		size: {
			w: 50,
			h: 50,
		},
	};
	/** @type {Phaser.GameObjects.Rectangle | null }*/
	person = null;

	constructor() {
		super("MainGame");
	}

	init() {
		// set person
		this.person = this.add.rectangle(
			this.personData.pos.x,
			this.personData.pos.y,
			this.personData.size.w,
			this.personData.size.h,
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
