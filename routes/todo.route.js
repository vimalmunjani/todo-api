const express = require('express');
let router = express.Router();

const Todocontroller = require('../controllers/todo.controller');

router.get('/',Todocontroller.getTodos);
router.post('/',Todocontroller.createTodo);
router.put('/:id', Todocontroller.updateTodo);
router.delete('/:id', Todocontroller.deleteTodo);


// router.get('/', function(req, res){

    
//     res.json({
//         status: 200,
//         data: "Dummy",
//         url: req.baseUrl,
//         message: "Working"
//     })
// });

// router.post('/',function(req, res){
//     res.json({
//         status: 200,
//         data: "Dummy",
//         url: req.url,
//         message: "Working"
//     })
// });

// router.put('/:id', function(req, res){
//     res.json({
//         status: 200,
//         data: "Dummy",
//         url: req.url,
//         message: "Working"
//     })
// });

// router.delete('/:id',function(req, res){
//     res.json({
//         status: 200,
//         data: "Dummy",
//         url: req.url,
//         message: "Working"
//     })
// });


module.exports = router;