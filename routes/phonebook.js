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

router.get('/:postId', async (req, res) =>{
    try{
        const getContact = await Phonebook.findOne({_id: req.params.postId})
        res.json(getContact);
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

router.delete('/:postId', async (req,res)=>{
    try {
        const removeContact = await Phonebook.deleteOne({_id: req.params.postId});
        res.json(removeContact);
    } catch (err){
        res.json({message:err});
    }
});

router.patch('/:postId', async (req,res) => {
    try{
        const updateContact = await Phonebook.updateOne({_id: req.params.postId},
             {$set: {first_name: req.body.first_name,
                     last_name: req.body.last_name,
                     phone_numbers: req.body.phone_numbers}});
        res.json(updateContact);

    } catch (err) {
        res.json({message: err});
    }
});

router.put

module.exports = router;