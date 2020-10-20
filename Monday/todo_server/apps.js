const express = require("express")
const app = express()
const cors = require('cors')
const response= require("express")

app.use(express.json())
app.use(cors())


let todo = [
    {
        "task":"washdishes",
        'priority':'normal'
    },
    {
        'task':'cook dinner',
        'priority':'high'
    },
]

app.listen(3000,()=>{
    console.log("Local server is running")
})

app.get('/todolist',(req,res)=>{
    let movie = {"todoList":todo}
    res.json(movie)
})

app.post('/todolist',(req,res)=>{
    let task = req.body.task
    let priority = req.body.priority
    let taskdetail = {task:task,priority:priority}
    todo.push(taskdetail)
    res.json({success:true})

})

app.delete('/todolist/:task',(req,res)=>{
    const requestTask = req.params.task;

    let taskDelete = todo.filter(task =>{
        return task.task == requestTask
    })[0];
    const index = todo.indexOf(taskDelete)
    todo.splice(index,1);

    res.json({
        success:true
    })
})