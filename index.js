const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Todo = require('./models/todo');
const app = express();
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// request handler for index
app.get('/',function(req,res)
{
    Todo.find({}, function(err,todos)
    {
        if(err)
        {
            console.log('error in fetching task from db');
            return ;
        }
            return res.render('home' ,{
            title : 'Todo List',
            todo_list : todos
        });
    });
});
//request handler for create-task
app.post('/create-task' ,function(req , res)
{
    Todo.create({
        task_name : req.body.task_name,
        task_type : req.body.task_type,
        task_date : req.body.task_date
    });
    return res.redirect('back');
});
//request handler for delete-task
app.post('/delete-task', function(req,res){
    var items=[];
    for(var key in req.body){
        items=req.body[key];
    }
    Todo.deleteMany({_id:{$in:items}},function(err, data){
        if (err) throw err;
        res.json(data);
    });
});
//Create a server that listens on port 8080 of computer
app.listen(port , function(err)
{
    if(err)
    {
        console.log('error in running the server' , err);
    }
    console.log('my express server is running on port ', port);
});