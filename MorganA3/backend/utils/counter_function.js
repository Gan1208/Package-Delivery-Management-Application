var admin = require("firebase-admin");
const db = admin.firestore();

async function counterIncrementOne(operation){
    let counter = db.collection("counters").doc("CRUDOperations");
    await counter.update({
        [`${operation}`]: admin.firestore.FieldValue.increment(1)
    });
};


//Increment mathod resource: https://stackoverflow.com/questions/31423124/how-to-increment-a-record-in-firebase


async function counterIncrementOne(operation){
    let counter = db.collection("counters").doc("CRUDOperations");
    await counter.update({
        [`${operation}`]: admin.firestore.FieldValue.increment(1)
    });
};



module.exports = {counterIncrementOne};