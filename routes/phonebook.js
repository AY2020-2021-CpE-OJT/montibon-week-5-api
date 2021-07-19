const express = require('express');
const router = express.Router();
const Phonebook = require ('../collections/Phonebook');
const verifyToken = require('../routes/verifyToken');
const jwt = require('jsonwebtoken');


router.get('/showphonebook', verifyToken, async (req, res) => {
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


router.get('/getcontact/:id', verifyToken, async (req, res) =>{
    try{
        const getContact = await Phonebook.findById(req.params.id);
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

router.post('/createcontact' , verifyToken, async(req, res) => {
     const createContact = new Phonebook({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_numbers: req.body.phone_numbers
     });
    try{
         const savedContact = await createContact.save()

         jwt.verify(req.token, 'secretkey', (err) =>{
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

router.delete('/delete/:id', verifyToken, async (req,res)=>{
    try {
        const removeContact = await Phonebook.findByIdAndDelete(req.params.id);

        jwt.verify(req.token, 'secretkey', (err) =>{
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

router.patch('/updatecontact/:id', verifyToken, async (req,res) => {
    try{
        const updateContact = await Phonebook.updateOne({_id: req.params.id},
             {$set: {first_name: req.body.first_name,
                     last_name: req.body.last_name,
                     phone_numbers: req.body.phone_numbers}});
        
        jwt.verify(req.token, 'secretkey', (err) =>{
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