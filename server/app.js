import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 1234;

const rootDir = process.cwd();

app.use(morgan("dev"));

app.use(express.static(rootDir + "/public"));

app.listen(PORT, () => {
	console.log(`Server listening: http://localhost:${PORT}/`);
});
