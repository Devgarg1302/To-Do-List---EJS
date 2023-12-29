const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let newItems = ["Book", "Laptop", "Phone"];
let workItems = [];

app.get('/', (req, res) => {

    let day = date();
    res.render("list", {
        listTitle: day,
        newListItems: newItems
    })
})

app.post('/', (req, res) => {
    let item = req.body.newItem;
    if(!item){
        console.log("empty");
    }
    else if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        newItems.push(item);
        res.redirect("/");
    }
})

app.get('/work', (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems,
    })
})

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})