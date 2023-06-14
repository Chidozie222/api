let mongo = require('mongodb');
let {MongoClient} = require('mongodb');
var mongoUrl = "mongodb+srv://john:fugZrMMyLCnb8In9@cluster0.cyzwmu6.mongodb.net/?retryWrites=true&w=majority";
let client = new MongoClient(mongoUrl)



async function dbConnect(){
    await client.connect()
} 

let db = client.db('firstdb')

async function getData(colName,query){
    let output = [];
    try{
        const cursor = db.collection(colName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    } catch(err){
        output.push({"Error":"Error in getData"})
    }
    return output;
}


async function postData(colName,data){
    let output
    try{
        await db.collection(colName).insertOne(data)
        output = {"response":"data added"}
    }
    catch(err){
        output = {"Error":"Error in postData"}
    }
    return output;
}


async function updateOrder(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).updateOne(condition,data)
    }  catch(err){
        output = {"Error":"Error in update data"}
    }
    return output;
}



async function deleteOrder(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).deleteOne(condition,)
    }  catch(err){
        output = {"Error":"Error in delete data"}
    }
    return output;
}

module.exports = {
    dbConnect,
    getData,
    postData,
    updateOrder,
    deleteOrder
}