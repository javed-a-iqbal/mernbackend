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

 app.use('/todos',toDoRoutes);

app.listen(PORT,function(){

    console.log("server is running on port: "+PORT)

});