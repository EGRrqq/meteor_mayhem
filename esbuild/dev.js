import * as esbuild from "esbuild";

const ctx = await esbuild.context({
  logLevel: "info",
  entryPoints: ["client/game.js"],
  bundle: true,
  sourcemap: true,
  outfile: "public/bundle/game.min.js",
});

await ctx.watch();

