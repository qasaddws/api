//宿舍

var express = require('express');
var router = express.Router();
var service = require('../service/DeptService')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     var data = service.getDepts(res);
// });
router.get('/', service.getDepts);
router.get('/:id', service.getDoctor);

//:id req.params.id
// router.post('/add', service.addDept);
// router.get('/del', service.delDept);
module.exports = router;
