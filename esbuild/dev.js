import esbuildServe from "esbuild-serve";

esbuildServe(
	{
		logLevel: "info",
		entryPoints: ["client/game.js"],
		bundle: true,
		sourcemap: true,
		outfile: "public/game.min.js",
	},
	{ root: "public", port: 1234 },
);
