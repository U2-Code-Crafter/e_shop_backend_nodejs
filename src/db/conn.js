const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://umerkhalid054:iOMAEGPvhd9P1rtM@cluster0.vrp6bv1.mongodb.net/eshop?retryWrites=true&w=majority").then(() => {
    console.log("connection is successful");
}).catch((e) => {
    console.log(e, "No connection");
})
