//电脑

var express = require('express');
var router = express.Router();
var $ = require('../controllers/Computer_Controller');

router.route('/')
    .get($.list)
    .post($.create);
router.route('/:id')
    .post($.update)
    .get($.get)
    .delete($.delete);

module.exports = router;
