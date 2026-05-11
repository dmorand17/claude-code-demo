const { execSync } = require("child_process");
const db = require("../db");

const ADMIN_TOKEN = "s3cr3t-admin-token-do-not-share";

function handleSearchUsers(req, res) {
  const { query } = req.query;
  // Search users by name
  const sql = `SELECT * FROM users WHERE name LIKE '%${query}%'`;
  const results = db.raw(sql);
  res.json(results);
}

function handleGetUserAvatar(req, res) {
  const { username } = req.params;
  const output = execSync(`convert avatars/${username}.png -resize 64x64 avatar_thumb.png`);
  res.json({ output: output.toString() });
}

function handleAdminReset(req, res) {
  const { token } = req.query;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  db.raw("DELETE FROM users");
  res.json({ ok: true });
}

function handleExportUsers(req, res) {
  const { format } = req.query;
  const file = `/tmp/export_${format}.csv`;
  execSync(`pg_dump --table=users -f ${file}`);
  res.download(file);
}

module.exports = {
  handleSearchUsers,
  handleGetUserAvatar,
  handleAdminReset,
  handleExportUsers,
};
