const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

let items = [];
let workItems = [];




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });


let isToday = true;

const ItemSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model("Item", ItemSchema);

//for custom lists 
const ListsSchema = new mongoose.Schema({
    name: String,
    items: [ItemSchema]
});

const List = mongoose.model("List", ListsSchema);


app.get("/", function(req, res) {

    isToday = true;
    let date = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = date.toLocaleDateString("en-US", options);
    Item.find(function(err, items) {
        if (err) {
            console.log(err);

        } else {

            res.render("list", { kindOfDay: day, newListItem: items });
        }
    });


})



app.post("/", function(req, res) {
    let itemName = req.body.newItem;
    let ListType = req.body.list;



    if (isToday) {
        let item = new Item({
            name: itemName
        });

        item.save(function(err) {
            if (err) {
                console.log(err);

            } else {
                console.log("Insert regular item successfully");

            }
        })
        res.redirect("/");
    } else {
        let item = new Item({
            name: itemName
        });

        List.findOne({ name: ListType }, function(err, lists) {

            if (!err) {
                lists.items.push(item);
                lists.save();
                res.redirect("/" + lists.name);
            } else {
                console.log(err);

            }

        });


    }








});

app.post("/delete", function(req, res) {
    const id = req.body.checked_id;
    const type = req.body.selectedType;


    if (isToday) {
        Item.findByIdAndRemove(id, function(err) {
            if (!err) {
                console.log("Successfully Delete from regular item lists");
                res.redirect("/");

            } else {
                console.log(err);

            }
        });
    } else {

        List.update({ name: type }, { $pull: { items: { _id: id } } }, function(err) {
            if (err) {
                console.log(err);

            } else {
                console.log("Successfully remove item from " + type);
                res.redirect("/" + type);
            }
        })




    }



});





app.get("/:ListName", function(req, res) {

    isToday = false;
    const ListName = req.params.ListName;

    List.findOne({ name: ListName }, function(err, lists) {

        if (!err) {
            if (lists) { //list already exists

                res.render("list", { kindOfDay: lists.name, newListItem: lists.items });
            } else { //new list 
                const newList = new List({
                    name: ListName,
                    items: []
                })
                newList.save();
                res.redirect("/" + ListName);

            }
        } else {
            console.log(err);

        }

    });


});





app.listen(3000, function() {
    console.log("Server starting on port 3000");
});