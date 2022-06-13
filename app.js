const express = require("express");
const app = express();
const mongoose = require("mongoose");
const tasks = require("./routes/Tasks");
const notfound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

require("dotenv").config();
// middleware
app.use(express.json());
app.use(express.static("./public"));
app.get("/", (req, res) => {
	res.send("Task Manager App");
});

// routes
app.use("/api/v1/tasks", tasks);
app.use(notfound);
app.use(errorHandler);

console.log("Task Manager is Running...");
// Connect to MongoseDB
mongoose
	.connect(process.env.MONGODB_CONNECTION)
	.then(() => console.log("Connect to the Database!"))
	.catch((error) => console.log(error));

const port = 3000 || process.env.PORT;
app.listen(port, console.log(`listening on port ${port}...`));
