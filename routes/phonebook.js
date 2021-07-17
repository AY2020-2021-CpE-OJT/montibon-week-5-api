const express = require('express');
const router = express.Router();
const Phonebook = require ('../collections/Phonebook');
const verifyToken = require('./verifyToken');


router.get('/' , verifyToken, async (req, res) => {
    try{
        const showPhonebook = await Phonebook.find();
        jwt.verify(req.token, 'secretkey', (err, showPhonebook) =>{
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


router.get('/:postId', verifyToken, async (req, res) =>{
    try{
        const getContact = await Phonebook.findById();

        jwt.verify(req.token, 'secretkey', (err, getContact) =>{
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

         jwt.verify(req.token, 'secretkey', (err, savedContact) =>{
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

router.delete('/:postId', verifyToken, async (req,res)=>{
    try {
        const removeContact = await Phonebook.deleteOne({_id: req.params.postId});

        jwt.verify(req.token, 'secretkey', (err, removeContact) =>{
            if (err){
                res.sendStatus(403);
            } else {
                res.json(removeContact);            }
        });
        
    } catch (err){
        res.json({message:err});
    }
});

router.patch('/:postId', verifyToken, async (req,res) => {
    try{
        const updateContact = await Phonebook.updateOne({_id: req.params.postId},
             {$set: {first_name: req.body.first_name,
                     last_name: req.body.last_name,
                     phone_numbers: req.body.phone_numbers}});
        
        jwt.verify(req.token, 'secretkey', (err, updateContact) =>{
            if (err){
                res.sendStatus(403);
            } else {
                res.json(updateContact);            }
        });

    } catch (err) {
        res.json({message: err});
    }
});


module.exports = router;