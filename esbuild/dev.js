import { build } from "esbuild";

const builder = async () => {
	await build({
		logLevel: "info",
		entryPoints: ["client/game.js"],
		bundle: true,
		sourcemap: true,
		outfile: "public/bundle/game.min.js",
	});
};
builder();
