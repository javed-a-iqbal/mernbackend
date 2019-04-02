const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const PORT=4000;
const mongoose=require('mongoose');
let Todo=require('./todo.model');

let toDoRoutes=express.Router();

app.use(cors());
app.use(bodyParser.json());


 mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser:true});
const connection=mongoose.connection;

connection.once('open',function(){

    console.log("connection established successfuly");

 });

toDoRoutes.route('/').get(function(req,res){
    Todo.find(function(err,todos){
        if(err){
          console.log(err)  
        }else{
            res.json(todos);
        }
    });

});

toDoRoutes.route('/:id').get(function(req,res){

    let id=req.params.id;
    Todo.findById(id, function(err,todo){
        res.json(todo);

    })

});

toDoRoutes.route('/add').post(function(req,res){

    let todo=new Todo(req.body);
    todo.save()
    .then(todo => {
        res.status(200).json({'todo':'todo added successfully'});
    })
    .catch(err =>{
        res.status(400).send('adding new todo failed');
    })

});

toDoRoutes.route('/update/:id').post(function(req,res){
    Todo.findById(req.params.id, function(err,todo){
      if(!todo) {
          res.status(404).send('data is not found');
      } else {
          todo.todo_description=req.body.todo_description;
          todo.todo_todo_responsible=req.body.todo_todo_responsible;
          todo.todo_priority=req.body.todo_priority;
          todo.todo_completed=req.body.todo_completed;

          todo.save().then(todo =>{
              res.json('Todo updated');

          })
          .catch( err =>{
            res.status(400).send("updated not possible")
          });

      }
    })
})

 app.use('/todos',toDoRoutes);

app.listen(PORT,function(){

    console.log("server is running on port: "+PORT)

});