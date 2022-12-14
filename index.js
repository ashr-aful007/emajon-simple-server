const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

//middle ware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.bsfuvd2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
     try{
          const productCollection = client.db('emajhon').collection('products')
          
          app.get('/products', async(req, res) =>{
               const query = {}
               const cursor = productCollection.find(query);
               const products = await cursor.toArray();
               res.send(products)
          })
     }
     finally{

     }



}
run().catch(err => console.log(err));







app.get('/', (req, res) =>{
     res.send('emajon server runnging')
})

app.listen(port, () =>{
     console.log(`emajon runnging on: ${port}`)
})