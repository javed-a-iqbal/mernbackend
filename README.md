# mernbackend   Building A React CRUD Application
# cors is express middleware
few helpful commands


mkdir backend
cd backend

npm init -y

npm install express body-parser cors mongoose 

npm install -g nodemon

if you cloning this project skip above steps and just run npm update then proceed

install MongoDB community edition and statrt it by typing  
 mongod 
 
 open 2nd terminal and type
 mongo to open mongo clien
  
 type these commands to create database
  use todos
  
 todos database is now existing.
  
  run server  using nodemon server
  
  launch postman 
  
  and send a Post request to add a 'toDo' item.
  
  in url of postman plugin type 'localhost:4000/add
  
  select raws and choose JSON (application/json) from dropdown
  
  past the following in text area
  
  {
  "todo_description":"This is my first todo",
  "todo_responsible": "Mark",
  "todo_priorty":High",
  "todo_completed":false
  }
  
  and then click on send, you can add number of todos here.
  
  check available todos list.
  
  localhost:4000/todos
 
  
  
  
 


