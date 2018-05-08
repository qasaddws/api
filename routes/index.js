var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/Employee_Controller');
var config = require('../models/Config');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/config",function(req,res,next){
  res.send(config.Config);
});
router.route('/login')
  .post(employeeController.getUserByName)
  .get(employeeController.getUserByName);

module.exports = router;
