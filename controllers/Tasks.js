const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json({ success: true, amount: tasks.length, tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task: task });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const task = await Task.findOne({ _id: req.params.id });
	if (!task) {
		return next(createCustomError("Task not found!", 404));
	}
	res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
	const id = req.params.id;
	const data = req.body;

	const task = await Task.findOneAndUpdate({ _id: id }, data, {
		new: true,
		runValidators: true,
	});
	if (!task) {
		return next(createCustomError("Task not found!", 404));
	}
	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const task = await Task.findOneAndDelete({ _id: req.params.id });
	if (!task) {
		return next(createCustomError("Task not found!", 404));
	}
	res.status(200).send();
});

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
