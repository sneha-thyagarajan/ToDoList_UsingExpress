import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/getstarted", (req, res) => {
    res.render("list.ejs");
});

var Tasks = [];
var flag = true;
app.post("/addtask", (req, res) => {

    flag = true;
    var newTask = req.body.newtask;
    Tasks.push(newTask);
    if (Tasks.length === 0) {
        flag = false;
    }
    res.render("list.ejs", {
        Task: Tasks,
        Flag: flag
    });

});

app.post("/removetask", (req, res) => {
    var remove = req.body.item;
    // console.log(remove);
    Tasks.splice(Tasks.indexOf(remove), 1);

    if (Tasks.length === 0) {
        flag = false;
    }
    res.render("list.ejs", { Task: Tasks, Flag: flag });

});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});