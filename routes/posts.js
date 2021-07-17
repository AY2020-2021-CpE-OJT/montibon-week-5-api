const router = require('express').Router();
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');

router.get('/' , verifyToken, (req, res) => {
    res.json({posts: {title: 'my first post' , description: 'you shall not pass'}});
});

router.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if (err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
        });
        }
    });
});

module.exports = router;