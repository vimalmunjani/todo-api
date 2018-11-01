const TodoService = require('../services/todo.service');
const logger = require('../utils/logger');

let log = (message) => {
    logger(__filename, message);
}

// GET Todos - GET Method
exports.getTodos = function(req, res, next){

    let todos = TodoService.getTodos();
    

    todos.then((todo) => {

        console.log(`TODO(C) - ${todo}`);
        res.status(200).json({
            status: 200,
            data: todo,
            message: 'Get Todo Successful'
        });

    }).catch((error) => {

        res.status(404).json({
            status: 404,
            data: null,
            message: 'Get Todo Unsuccessful'
        });

    });
         
    // console.log(`TODOS -- ${todos}`);

    // if(!todos){

    //     return res.status(400)
    //             .json({
    //                 status: 400,
    //                 message: "Unable to retrieve Todos"
    //             });
    // }

    // return res.status(200)
    //           .json({
    //             status: 200,
    //             data: todos,
    //             message: "Successfully retrieved Todos"
    //           });

}

// CREATE Todo - POST Method
exports.createTodo = function(req, res, next){

    if(!req.body.title){
        res.status(400).json({
            status: 400,
            message: "No title found in the body"
        })
    }
    
    let todo = {
        title: req.body.title,
        description: req.body.description ? req.body.description :'No description' ,
        status: req.body.status
    }

    let savedTodo = TodoService.createTodo(todo);

    savedTodo.then((todo) => {
        console.log("savedTodo -- "+todo);
        res.json({
            status: 200,
            data: todo,
            message: 'Todo created successfully'
        });
    }).catch((error) => {
        console.log("error -- "+error);
        res.send(error);
    });


    // console.log("savedTodo(C) -- "+savedTodo)

    // if(!savedTodo){
    //     return res.status(400).json({
    //         status: 400,
    //         message: "Unable to create Todo"
    //     })
    // }

    // return res.status(200).json({
    //     status: 200,
    //     data: savedTodo,
    //     message: "Todo creation successful"
    // });

}

// UPDATE Todo - PUT Method
exports.updateTodo =async function(req, res, next){

    log('entering update todo');

    if(!req.body.id){

        log(`no id param found`);

        res.status(400).json({
            status: 400,
            data: null,
            message: 'No Id parameter found in the body'
        });

    }

    log(`reading id from req body ${req.body.id} `)

    let todo = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    
    log(JSON.stringify(todo));

    try{

        let updateTodo =await TodoService.updateTodo(todo);

        log('todo found');

        res.status(200).json({
            status: 200,
            data: updateTodo,
            message: 'Todo Update Successful'
            });

    }catch(e){

        console.log(e.message);

        res.status(400).json({
            status: 400,
            data: null,
            message: e.message
        });
    }    
}

// DELETE Todd - DELETE Method
exports.deleteTodo = async function(req, res, next){

    if(!req.params.id){
        res.status(400).json({
            status: 400,
            data: null,
            message: 'ID required'
        });
    }
    
    try{
        let deleteTodo = await TodoService.deleteTodo(req.params.id);

        res.status(200).json({
            status: 200,
            data: deleteTodo,
            message: 'Todo deleted successfully'
        });

    }catch(e){

        res.status(400).json({
            status: 400,
            data: null,
            message: e.message
        });

    }

}