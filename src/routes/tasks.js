// Demo route file — intentionally has a few issues for the code-reviewer agent to find.
const store = require("../app");

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

// BUG: missing input validation — title could be empty
// BUG: wrong status code — should be 201 for creation
function handleCreateTask(req, res) {
  const { title, description } = req.body;
  const task = store.createTask(title, description);
  res.json(task);
}

// BUG: no error handling around store.completeTask
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
  handleGetTasks,
  handleGetTask,
  handleCreateTask,
  handleCompleteTask,
  handleDeleteTask,
};
