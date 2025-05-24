const express = require('express');
const router = express.Router();

let admins = [
  { id: 1, username: "admin", password: "admin" }
];

router.get('/', (req, res) => res.json(admins));

module.exports = router;