import { build } from "esbuild";
import clean from "esbuild-plugin-clean";
import copy from "esbuild-plugin-copy";

const builder = async () => {
	await build({
		entryPoints: ["client/game.js"],
		bundle: true,
		minify: true,
		sourcemap: false,
		target: ["chrome58", "firefox57", "safari11", "edge16"],
		outfile: "./dist/game.min.js",
		plugins: [
			clean({
				patterns: [
					"./dist/*",
					"./public/game.min.js",
					"./public/game.min.js.map",
				],
			}),
			copy({
				assets: [
					{ from: "./public/index.html", to: "./" },
					// { from: "./public/style.css", to: "./" },
					// { from: "./public/favicon.ico", to: "./" },
					// { from: "./public/favicon.png", to: "./" },
					// { from: "./public/assets/**/*", to: "./assets/" },
				],
			}),
		],
	});
};
builder();
