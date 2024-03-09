const router = require('express').Router();
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join__dirname, '../public/notes')
})

module.exports = router;