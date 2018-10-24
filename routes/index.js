var express = require('express');
var router = express.Router();

const todoRouter = require('./todo.route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api/todos',todoRouter);

module.exports = router;
