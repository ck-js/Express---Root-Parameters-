const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get list of all posts')
})

module.exports = router;