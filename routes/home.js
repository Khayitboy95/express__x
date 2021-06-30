const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: "Bosh sahifa", greeting: "lorem ipsum doler"});
});

module.exports = router;