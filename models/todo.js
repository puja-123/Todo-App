const mongoose = require('mongoose');
// schema of todo database
const TodoSchema = new mongoose.Schema({
    task_name: {
        type:String,
        required : true
    },
    task_type : {
        type : String,
        required  : true
    },
    task_date : {
        type : Date,
        required  : true
    }
});
//exporting todo database
const Todo = mongoose.model('Todo' , TodoSchema);
module.exports = Todo;