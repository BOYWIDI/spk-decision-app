const express = require('express');
const router = express.Router();

let responses = [];

router.post('/', (req, res) => {
    const response = req.body;
    response.id = responses.length + 1;
    responses.push(response);
    res.status(201).json(response);
});

router.get('/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const result = responses.filter(r => r.userId === userId);
    res.json(result);
});

module.exports = router;