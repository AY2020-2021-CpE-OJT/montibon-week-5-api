const express = require('express');
const router = express.Router();
const Phonebook = require ('../collections/Phonebook');

router.get('/' , async(req, res) => {
    try{
        const showPhonebook = await Phonebook.find();
        res.json(showPhonebook);

    }catch(err){
        res.json({message:err});
    }
});

router.post('/' , async(req, res) => {
     const createContact = new Phonebook({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_numbers: req.body.phone_numbers

     });
    try{
         const savedContact = await createContact.save()
         res.json(savedContact);
    } catch (err){
        res.json({message: err});
    }
});

module.exports = router;