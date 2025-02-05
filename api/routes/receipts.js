const express = require('express');
const router = express.Router();
const {processReceipt, rewardPointAmounts} = require('../receiptHelpers')


router.get('/:id/points', (req, res) => {
    const requestedId = req.params.id;
    

   
    try {
        
        const points = rewardPointAmounts[requestedId];

        if (points == undefined){
            throw "ERROR: ID is undefined";
        }
        
        res.status(200).send(points);

    }
    catch(err){
        // console.log(err);
        res.status(404).send({message: "No receipt found for that ID."});

    }

});


router.post('/process', (req, res) => {
    
    try {
        const recieptPointId = processReceipt(req.body);
        res.status(200).send(recieptPointId);

    }
    catch(err){
        // console.log(err);
        res.status(400).send({message: "The receipt is invalid."});

    }
    
    

});

module.exports = router;