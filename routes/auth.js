const router = require('express').Router();
const User = require('../collections/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const {registerValidation, loginValidation} = require('../validation');

// router.post('/register', async (req, res) => {

//     const {error} = registerValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);


//     const emailExist = await User.findOne({email: req.body.email});
//     if (emailExist) return res.status(400).send('Email already exists');

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const user = new User ({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     });

//     try {
//         const savedUser = await user.save();
//         res.send(savedUser);
//     } catch (err){
//         res.status(400).send(err);
//     }
// });

// router.post('/login', async (req,res) => {
//     const {error} = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const user = await User.findOne({email: req.body.email});
//     if (!user) return res.status(400).send('Invalid Email/Password');

//     const validPass = await bcrypt.compare(req.body.password, user.password);

//     if (!validPass) return res.status(400).send('Invalid Email/Password');

//     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
//     res.header('auth-token' , token).send(token);

//     res.send('Success');
// });

router.post('/api/login', (req, res) => {
    const user = {
        id: 6125161461377,
        username: 'guest',
        email: 'guest@gmail.com',
        password: 'TheAlphaAndTheOmega'
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

    //, {expiresIn: '30s'}


module.exports = router;