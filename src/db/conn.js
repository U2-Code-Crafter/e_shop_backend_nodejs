const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://umerkhalid054:mdb054@cluster0.vrp6bv1.mongodb.net/eshop?retryWrites=true&w=majority").then(() => {
    console.log("connection is successful");
}).catch((e) => {
    console.log(e, "No connection");
})
