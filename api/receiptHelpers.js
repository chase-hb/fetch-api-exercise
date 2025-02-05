const { v4: uuidv4 } = require('uuid');

let rewardPointAmounts = {

}

function validateReceipt(receipt){
    const retailerName = receipt.retailer;
    const retailerPattern = /^[\w\s\-&]+$/g;
    const nameIsValid = retailerPattern.test(retailerName);
    if(!nameIsValid){
        throw "ERROR: Retailer name is invalid";
    }

    const receiptDate = receipt.purchaseDate;
    if (isNaN(Date.parse(receiptDate))) {
        throw "ERROR: Purchase date is invalid";
    }

    const receiptTime = receipt.purchaseTime;
    const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    const timeIsValid = timePattern.test(receiptTime);
    if(!timeIsValid){
        throw "ERROR: Purchase time is invalid";
    }



    const items = receipt.items;
    for (eachItem of items){
        let description = eachItem.shortDescription.trim();
        let itemPrice = eachItem.price;
        const pricePattern = /^\d+\.\d{2}$/;
        const priceIsValid = pricePattern.test(itemPrice);
        if(!priceIsValid){
            throw "ERROR: An item price is invalid";
        }

        const descriptionPattern = /^[\w\s\-]+$/;
        const descriptionIsValid = descriptionPattern.test(description);
        if(!descriptionIsValid){
            throw "ERROR: An item description is invalid";
        }
    }

    const receiptTotal = receipt.total;
    const totalPattern = /^\d+\.\d{2}$/;
    const totalIsValid = totalPattern.test(receiptTotal);
        if(!totalIsValid){
            throw "ERROR: The receipt total is invalid";
        }


}


function retailerNamePoints(retailerName){
    const alphaNum = retailerName.match(/[a-zA-Z0-9]+/g);
    const characterTotal = (alphaNum.join("")).length;
    // console.log(`Retailer name points: ${characterTotal}`);
    return characterTotal;
}



function receiptTotalPoints(total){

    let pointsAwarded = 0;

    if (total % 1 == 0){
        pointsAwarded += 50;
    }

    if (total % 0.25 == 0){
        pointsAwarded += 25
    }

    // console.log(`Points awarded from the total: ${pointsAwarded}`);

    return pointsAwarded;

}

function receiptItemPoints(items){
    
    let pointsAwarded = 0;

    pointsAwarded += Math.floor(((items.length) / 2)) * 5;

    for (eachItem of items){
        let descriptLength = eachItem.shortDescription.trim().length;
        if (descriptLength % 3 == 0){
            pointsAwarded += Math.ceil(eachItem.price * 0.2);
        }
    }

    // console.log(`Points awarded from the items or item descriptions: ${pointsAwarded}`);
    return pointsAwarded;
}



function receiptDateTimePoints(purchaseDate, purchaseTime){
    let pointsAwarded = 0;

    let convertedDate = new Date(purchaseDate);
    if (convertedDate.getUTCDate() % 2 == 1){
        pointsAwarded += 6;
    }
    
    let convertedTime = new Date(`1999-05-01 ${purchaseTime}`);
    let hour = convertedTime.getHours();
    if (hour > 13 && hour < 17){
        pointsAwarded += 10;
    }

    // console.log(`Points awarded from the time or date: ${pointsAwarded}`);
    return pointsAwarded;


}




function processReceipt(receipt){
    validateReceipt(receipt);
    
    const newId = uuidv4();
    
    // console.log(`New ID created: ${newId}`)
    const rewardPointTotal = retailerNamePoints(receipt.retailer) + receiptTotalPoints(receipt.total) + receiptItemPoints(receipt.items) + receiptDateTimePoints(receipt.purchaseDate, receipt.purchaseTime);


    rewardPointAmounts[newId] = {
        points: rewardPointTotal
    }

    return {
        id: newId
    }
}



module.exports = { processReceipt, rewardPointAmounts };
