//招生老师 & 咨询师
//县办 区域经理 总监

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 * ----CRUD----
 *  GET    /users[/]        => user.list()
 *  GET    /users/:id       => user.show()
 *  POST   /users[/]        => user.create()
 *  PUT  /users/:id       => user.update()
 *  DELETE /users/:id       => user.delete()
 *
 *
 *
 * ----页面渲染----
 *  GET    /users/new       => user.new()
 *  GET    /users/:id/edit  => user.edit()
 *
 *  http://cnodejs.org/topic/55778225c4e7fbea6e9a3357
 */

var express = require('express');
var router = express.Router();
var $ = require('../controllers/Enroller_Controller');

// router.get('/new', $.new);//页面渲染
// router.get('/:id/edit', $.edit);//页面渲染
router.route('/')
    .get($.list)
    .post($.create)
router.route('/:id')
    .get($.get)
    .post($.update)
    .delete($.delete);

module.exports = router;