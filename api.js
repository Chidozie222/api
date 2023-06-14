let express = require('express');
let api = express();
let port = process.env.PORT||2023;
let mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
let {dbConnect ,getData, postData, updateOrder, deleteOrder} = require('./controller/dbcontroller')


api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended:true}));
api.use(cors())


api.get('/', (req, res) => {
    res.send('Hiii boyz')
})

api.get('/category',async (req, res)=> {
    let query ={};
    let collection = "category";
    let output = await getData(collection,query);
    res.send(output)
})


api.get('/product', async(req, res)=> {
    let query = {};
    if(req.query.category_id){
        query={category_id:Number(req.query.category_id)}
    } else{
        query = {}
    }
    let collection = "product";
    let output = await getData(collection,query);
    res.send(output)
})

api.get('/filter/:category_id', async(req,res)=> {
    let category_id = Number(req.params.category_id)
    let lowcost = Number(req.query.lowcost)
    let highcost = Number(req.query.highcost)
    if(lowcost && highcost){
    query = {
        "category_id": category_id,
        $and:[{cost:{$gt:lowcost,$lt:highcost}}]
    } 
}  else{
    query = {}
}
 let collection = "product";
let output = await getData(collection,query);
    res.send(output)
})



api.get('/orders', async(req,res)=> {
    let query = {}
    let collection = "orders";
let output = await getData(collection,query);
    res.send(output)
})


//{"id":[1,2,3]}
api.post('/details',async (req,res)=> {
    if(Array.isArray(req.body.id)){
        let query = {category_id:{$in:res.body.id}};
        let collection = "product";
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('please pass the data in from of array')
    }
})




api.post('/placeorder', async(req, res)=>{
    let data = req.body;
    let collection = "orders";
    let response = await postData(collection,data)
    res.send(response)
})


api.put('/updateorder', async (req,res)=> {
    let collection = 'orders';
    let condition = {"_id":new mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})


api.delete('/deleteOrder',async (req,res)=>{
    let collection = "order"
    let condition = {"_id":new mongo.ObjectId(req.body._id)}
    let output = await deleteOrder(collection,condition)
    res.send(output)
})






api.listen(port,(err)=>{
    dbConnect()
    if(err) throw err;
    console.log(`server is running on port ${port}`)
})




