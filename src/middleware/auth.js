const { timingSafeEqual } = require("crypto");

function requireApiKey(req, res, next) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server misconfiguration: API_KEY not set" });
  }

  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const expected = Buffer.from(apiKey);
  const provided = Buffer.from(token);
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  next();
}

module.exports = { requireApiKey };
