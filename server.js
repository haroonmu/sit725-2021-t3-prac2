const express = require("express");
const app = express();
app.use(express.json());

const Class = [
    { id:1, Sname: "student 1"},
    { id:2, Sname: "student 2"},
    { id:3, Sname: "student 3"},
]

app.get("/", (req,res) =>{
res.send("This is class enrollment list.");
});

app.get("/enroll", (req,res) => {
    res.send(Class);
    });

    app.get("/enroll/:id", (req,res) => {
        const Student = Class.find(c => c.id === parseInt(req.params.id));
        if (!Student) res.status(404).send("The given id not found");
        res.send(Student);
        });

app.post("/enroll", (req,res) => {
    const Student = {
        id: Class.length + 1,
        Sname: req.body.Sname
    };
Class.push(Student);
res.send(Student);
});


app.delete("/enroll/:id", (req,res) => {
    const Student = Class.find(c => c.id === parseInt(req.params.id));
    if (!Student) res.status(404).send("The given id not found");
    
    const index = Class.indexOf(Student);
    Class.splice(index,1);
    res.send(Student);
    });

const port = 3000; 
app.listen(port, () => { 
    console.log("App is now listening to:" +port);
});