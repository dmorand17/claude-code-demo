const store = require("../app");
const { requireApiKey } = require("../middleware/auth");

function handleGetTasks(req, res) {
  const tasks = store.listTasks();
  res.json({ data: tasks });
}

function handleGetTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const task = store.getTask(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
}

function handleCreateTask(req, res) {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }
  const task = store.createTask(title, description);
  res.status(201).json(task);
}

function handleCompleteTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const task = store.completeTask(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
}

function handleDeleteTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const deleted = store.deleteTask(id);
  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(204).send();
}

module.exports = {
  requireApiKey,
  handleGetTasks,
  handleGetTask,
  handleCreateTask,
  handleCompleteTask,
  handleDeleteTask,
};
