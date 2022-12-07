const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);

// var corsOptions = {
// 	origin: "http://localhost:8081",
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const db = require("./app/models");
db.sequelize
	.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch(err => {
		console.log("Failed to sync db: " + err.message);
	});

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app, io);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
