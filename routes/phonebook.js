const express = require('express');
const router = express.Router();
const Phonebook = require ('../collections/Phonebook');
const verifyToken = require('../routes/verifyToken');
const jwt = require('jsonwebtoken');


router.get('/open', verifyToken, async (req, res) => {
    const openPhonebook = await Phonebook.find();
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if (err){
            res.sendStatus(403);
        } else {
             res.json(openPhonebook);
        }
    });
});

router.get('/', verifyToken, async (req, res) => {
    try{
        const showPhonebook = await Phonebook.find();
        jwt.verify(req.token, 'secretkey', (err) =>{
            if (err) {
                res.sendStatus(403);
            }
            else {
                res.json(showPhonebook);
            }
        });
    }catch(err){
        res.json({message:err});
    }
});


router.get('/:id', verifyToken, async (req, res) =>{
    try{
        const getContact = await Phonebook.findById();

        jwt.verify(req.token, 'secretkey', (err) =>{
            if (err){
                res.sendStatus(403);
            } else {
                res.json(getContact);
            }
        });
    }catch(err){
        res.json({message:err});
    }
});

router.post('/' , verifyToken, async(req, res) => {
     const createContact = new Phonebook({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_numbers: req.body.phone_numbers
     });
    try{
         const savedContact = await createContact.save()

         jwt.verify(req.token, 'secretkey', (err, authData) =>{
            if (err){
                res.sendStatus(403);
            } else {
                res.json(savedContact);
            }
        });
         
    } catch (err){
        res.json({message: err});
    }
});

router.delete('/:id', verifyToken, async (req,res)=>{
    try {
        const removeContact = await Phonebook.deleteOne({_id: req.params.postId});

        jwt.verify(req.token, 'secretkey', (err, authData) =>{
            if (err){
                res.sendStatus(403);
            } else {
                res.json(removeContact);            
            }
        });
        
    } catch (err){
        res.json({message:err});
    }
});

router.patch('/:id', verifyToken, async (req,res) => {
    try{
        const updateContact = await Phonebook.updateOne({_id: req.params.postId},
             {$set: {first_name: req.body.first_name,
                     last_name: req.body.last_name,
                     phone_numbers: req.body.phone_numbers}});
        
        jwt.verify(req.token, 'secretkey', (err, authData) =>{
            if (err){
                res.sendStatus(403);
            } else {
                res.json(updateContact);            
            }
        });

    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;