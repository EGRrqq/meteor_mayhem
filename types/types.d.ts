export {};

declare global {
	// base models
	interface IPoint {
		x: number;
		y: number;
	}

	interface ISize {
		w: number;
		h: number;
	}

	// person model
	interface IPersonData {
		pos: IPoint;
		size: ISize;
		color: number;
	}

	interface IPlayer {
		data: IPersonData;
	}

	type TPlayers = Record<string, IPlayer>;

	// extended models
	interface Math {
		randomArbitrary: (min: number, max: number) => number;
	}
}
