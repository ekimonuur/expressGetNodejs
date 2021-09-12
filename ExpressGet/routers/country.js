const fs = require('fs');
var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

//Read database connection info from file
const dbinfo = JSON.parse(fs.readFileSync('./dbinfo.json'));

//Setup database connection
const uri ="mongodb://"+dbinfo.username+":"+dbinfo.password+"@"+dbinfo.host+":"+dbinfo.port+"?authSource=admin";
const client = new MongoClient(uri);

router.get('/countries', async function (req, res) {
    try{
        let region = req.query['region'];

        await client.connect();
        const database = client.db(dbinfo.dbname);
        const countries = database.collection(dbinfo.table);

        let query = {};

        if(region) query = { region: region };
        
        let cursor = await countries.find(query);
        
        //throw new Error('deneme');

        res.send(await cursor.toArray());
    }catch(error){
        console.error(error);
        return res.status(500).send("Error occured");
    }finally{
        await client.close();
    }

});

module.exports = router