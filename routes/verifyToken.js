const jwt = require('jsonwebtoken');

// module.exports = function verify(req,res,next){
//     const token = req.header('auth-token');
//     if (!token) return res.status(401).send('Access Denied');

//     try{
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;
//         next();
//     }catch (err){
//         res.status(400).send('Invalid Token');
//     }
// }

module.exports = function (req, res, next){
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}