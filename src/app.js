// Simple demo app — demonstrates the project structure for Claude Code exercises.
const tasks = [];
let nextId = 1;

function createTask(title, description) {
  if (!title) throw new Error("title is required");
  const task = { id: nextId++, title, description: description || "", done: false };
  tasks.push(task);
  return task;
}

function getTask(id) {
  return tasks.find((t) => t.id === id) || null;
}

function listTasks() {
  return [...tasks];
}

function completeTask(id) {
  const task = getTask(id);
  if (!task) return null;
  task.done = true;
  return task;
}

function deleteTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

module.exports = { createTask, getTask, listTasks, completeTask, deleteTask };
