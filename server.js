const express = require("express");
const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { userInfo } = require("os");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTML get routes
app.get("/", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// API get route
app.get("/api/notes", (req, res) => {
	console.info(`${req.method} request received to get notes`);

	fs.readFile("./db/db.json", "utf8", (err, data) => {
		if (err) {
			console.error(err);
		} else {
			res.json(JSON.parse(data));
		}
	});
});

// API post route
app.post("/api/notes", (req, res) => {
	console.info(`${req.method} request received to add a note`);
	const { title, text } = req.body;
	if (title && text) {
		const newNote = {
			title,
			text,
			id: uuidv4(),
		};
		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) {
				console.error(err);
			} else {
				const parsedReviews = JSON.parse(data);
				parsedReviews.push(newNote);
				fs.writeFile(
					`./db/db.json`,
					JSON.stringify(parsedReviews),
					(writeErr) =>
						writeErr
							? console.error(writeErr)
							: console.info("Successfully updated Notes!")
				);
			}
		});
		const response = {
			status: "success",
			body: newNote,
		};
		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json("Error in posting Note");
	}
});

// API delete route
app.delete("/api/notes/:id", (req, res) => {
	console.info(`${req.method} request received to delete a note`);
	let db = JSON.parse(fs.readFileSync("./db/db.json"));
	let deleteNotes = db.filter((item) => item.id !== req.params.id);
	fs.writeFileSync("./db/db.json", JSON.stringify(deleteNotes));
	res.json(deleteNotes);
});
app.listen(PORT, () =>
	console.log(`Example app listening at http://localhost:${PORT}`)
);
