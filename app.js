const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let newItems = ["Book", "Laptop", "Phone"];

app.get('/', (req, res) => {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        newListItems: newItems
    })
})

app.post('/', (req, res) => {
    let item = req.body.newItem;
    if(!item){
    }
    else{
        newItems.push(item);
    }
    
    res.redirect("/");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})