const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = 3;
const User = require("../models/users");
const cloudinary = require('cloudinary').v2;


//create user

router.post('/create', async (req, res) => {
    let b = req.body;
    // console.log(req.body, "----14")
    // console.log(b, "=======15")
    let userdata = await User.findOne({ email: b.email });

    console.log(userdata, "=======20")
    if (!userdata) {
        b.password = await bcrypt.hash(b.password, salt);
        let data = await new User(req.body).save();

        res.json({ status: 1, data });
    } else {
        res.json({ status: 0, message: 'Email already exist' });
    }



});
//login user
router.post('/login', async (req, res) => {
    try {
        let b = req.body;
        var data = await User.findOne({ email: req.body.email });
        console.log(data, "-------34");
        let hashps = await bcrypt.compare(b.password, data.password);
        console.log(data && hashps, "-------35");
        if (data && hashps) {

            res.json({ status: 1, data });
        } else {
            res.json({ status: 0, message: 'Email not exist' });
        }

    } catch (err) {

        console.log('on Data');

    }
});



//update user

router.post('/update/:id', async (req, res) => {

    var data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json({ status: 1, data: data });


});


router.post('/update-img/:id', async (req, res) => {
    try {
        const image = req.body.image;
        const uploadedImage = await cloudinary.uploader.upload(`data:image/jpeg;base64,${image}`);
        var data = await User.findByIdAndUpdate(req.params.id, image, { new: true })
        
        res.status(200).json({ data: data, image_url: uploadedImage.url });
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
      }

});

//get all users

router.get('/all', async (req, res) => {

    var data = await User.find();

    res.json({ status: 1, data: data });

});

//get one user

router.get('/one/:id', async (req, res) => {

    var data = await User.findOne({ _id: req.params.id });

    res.json({ status: 1, data: data });

});

router.delete("/detele/:id", async (req, res) => {

    var data = await User.findByIdAndDelete();

    res.json({ status: 1, data: data });

});

module.exports = router;