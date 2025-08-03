const express = require("express");
const logger  = require('./logger')
const auth = require('./authentication')
const uuid = require("uuid")
const helmet = require("helmet")
const morgan = require("morgan")

require("dotenv").config()

const app = express()
app.use(express.json())

app.use(helmet())
if(app.get("env") === "development") app.use(morgan("tiny"))

app.use(logger)
app.use(auth)

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

const courses = [
    {id:1,name:"html"},
    {id:2,name:"javascript"},
    {id:3,name:"ts"}
]

app.get("/",(req, res)=>{
    res.send(
        "hello from first api from shahabzt"
    )
})

app.get("/api/courses",(req,res)=>{
    res.send(['shahab',"samira", "farhad", "sara", "ghizhola"])
})

app.get("/api/courses/:id",(req,res)=>{
    const findItem = courses.find((item)=>item.id === parseInt(req.params.id))
    if(!findItem) res.status(404).send("ایتم مورد نظر یافت نشد")
    res.send([findItem])
})

app.delete("/api/courses/:id",(req,res)=>{
     const findItem = courses.find((item)=>item.id === parseInt(req.params.id))
    if(!findItem) res.status(404).send("ایتم مورد نظر یافت نشد")
    const index  = courses.indexOf(parseInt(req.params.id))
    courses.splice(index,1)
    res.send(findItem)
})

app.post("/api/courses",(req,res)=>{
    const course = {
        id: uuid.v4(),
        name: req.body.name
    }
    courses.push(course)
    res.send(courses)
})

app.put("/api/courses", (req,res)=>{
    const findItem = courses.find((item)=>item.id === parseInt(req.body.id))
    if(!findItem){
        res.status(404).send("ایتم یافت نشد")
    }else{
        findItem.name = req.body.name
        // res.status(200).send("تغییرات با موفقیت انجام شد")
        res. send(courses)
    }
})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`listening port ${port}`)
})