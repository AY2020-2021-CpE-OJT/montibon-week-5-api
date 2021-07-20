const router = require('express').Router();
const User = require('../collections/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User ({
        username: req.body.username,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send('Invalid Username/Password');

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) return res.status(400).send('Invalid Email/Password');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.json({token});
    res.send('Success');
});

// router.post('/api/login', (req, res) => {
//     const user = {
//         id: 6125161461377,
//         username: 'guest',
//         email: 'guest@gmail.com',
//         password: 'TheAlphaAndTheOmega'
//     }

//     jwt.sign({user}, process.env.TOKEN_SECRET, (err, token) => {
//         res.json({
//             token
//         });
//     });
// });

// router.post('/api/login', (req, res) => {

//     const username = req.body.username
//     const user = {name: username}
    

//     jwt.sign({user}, process.env.TOKEN_SECRET, (err, token) => {
//         res.json({
//             token
//         });
//     });
// });


//, {expiresIn: '30s'}


module.exports = router;