const express = require('express');
const router = express.Router();
const TrialPB = require ('../collections/TrialPB');

router.get('/' , async(req, res) => {
    try{
        const showPB = await TrialPB.find();
        res.json(showPB);

    }catch(err){
        res.json({message:err});
    }
});

router.post('/' , async(req, res) => {
     const createPB = new TrialPB({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number

     });
    try{
         const savedPB = await createPB.save()
         res.json(savedPB);
    } catch (err){
        res.json({message: err});
    }
});

module.exports = router;