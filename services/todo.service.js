const Todo = require('../models/todo.model');

// GET TODOs
exports.getTodos = function(){

    return new Promise((resolve, reject) => {

        Todo.find()
        .where()   
        .then((todos) => {
            this.Todos = todos;
            console.log(` Todos(S) -- ${todos}`);
            resolve(todos);
        })
        .catch((error) => {
            console.log('Error retrieving todos');
            reject(new Error(error));
        });


    });
  
}

// CREATE TODO
exports.createTodo = function(todo){


    let newTodo =new Todo({
        title: todo.title,
        description : todo.description,
        date: new Date(),
        status: todo.status
    });

    // let savedTodo = await newTodo.save();
    // newtodo = savedTodo
    // console.log("newtodo -- "+newtodo);

    // return newtodo;
    

    return new Promise((resolve, reject) => {

        newTodo.save()
               .then((todo) => {

                    console.log(`Todo saved -- ${todo}`)
                    resolve(todo);

               }).catch((error) => {

                    console.log(`Error saving Todo -- ${error}`)
                    reject(new Error(error));

               });

    })


    // newTodo.save()
    //         .then((todo) => {

    //              console.log("todo(S) -- "+todo)
    //              this.savedTodo = todo;    
    //              console.log("savedTodo(S) -- "+savedTodo)
    //              return savedTodo;
    //         })
    //         .catch((error) => {
    //             console.log(`Error creating Todo - ${error}`);
    //             return;
    //         });
    
    // if(!savedTodo){
    //     return;
    // }

    //console.log("savedTodo -- "+savedTodo);
    
}

// UPDATE TODO
exports.updateTodo = async function(todo){

    let oldTodo, newTodo;
    let foundTodo, updateTodo;

    try{
        foundTodo = await Todo.findById(todo.id);
    }catch(e){
        throw Error('Error ocurred while finding Todo');
    }

    foundTodo.title = todo.title;
    foundTodo.description = todo.description;
    foundTodo.status = todo.status;

    try{
        updateTodo = await foundTodo.save();
    }catch(e){
        throw Error('Error updating Todo');
    }

    return updateTodo;

    // Todo.findById(oldTodoId)
    //                   .then((result) => {
    //                         this.oldTodo = result;
    //                         console.log(oldTodo);

    //                   })
    //                   .catch((error) => {
    //                         console.log(`No Todo find!!`);
    //                         return;
    //                   });
    
    // if(!oldTodo){
    //     return;
    // }

    // oldTodo.title = todo.title;
    // oldTodo.description = todo.description;
    // oldTodo.status = todo.status;

    // newTodo = oldTodo;

    // newTodo.save()
    //        .then((todo) => {
    //             console.log(todo);
    //             return todo;
    //        })  
    //        .catch((error) => {
    //            console.log(`Error updating Todo`);
    //            return;
    //        })
   
} 

// DELETE TODO
exports.deleteTodo = function(id){

return new Promise((resolve, reject) => {

    Todo.findByIdAndRemove(id)
    .then((deletedTodo) => {
        console.log(`Todo Deletion successful -- ${deletedTodo}`);
        resolve(deletedTodo);
    }).catch((error) => {
        console.log(`Error deleting Todo ${error.message}`);
        reject(new Error('Error Deleting Todo'));
    });

});

}