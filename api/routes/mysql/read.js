var express = require('express');
var router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const fetch = require('node-fetch');

const rBApiKey = "??";

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'brickbase'
  })
  
/* No such API */
router.get('/',(req,res,next)=>{
	res.send({response:"no such api exists"})
})

router.get('/readAllSetData',(req,res,next)=>{
    const sql = "SELECT * FROM sets";
    con.query(sql,(err,result)=>{
        if (err) throw err;
        res.send({response:result});
    })
});

router.get('/readAllSoldSetData',(req,res,next)=>{
    const sql = "SELECT * FROM sold";
    con.query(sql,(err,result)=>{
        if (err) throw err;
        res.send({response:result});
    })
});

router.get('/readFullSet',(req,res,next)=>{
    const id = req.query.id;
    const sql = "SELECT * FROM sets WHERE id='" + id + "'";
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({response:result});
    })
})

router.get('/readFullSoldSet',(req,res,next)=>{
    const id = req.query.id;
    const sql = "SELECT * FROM sold WHERE id='" + id + "'";
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({response:result});
    })
})

router.get('/readThemeName',(req,res,next)=>{
    const id = req.query.id;
    fs.readFile('db/ref/themes.json','utf8',(err,data)=>{
        if(err) throw err;
        data = JSON.parse(data);
        let name = "";
        data.forEach(item=>{
            if(parseInt(id) === parseInt(item.id)){
                name = item.name
            }
        })
        res.send({response:name});
    })
})

router.get('/readRbSetSearch',(req,res,next)=>{
	const searchStr = req.query.searchStr;
	fetch("https://rebrickable.com/api/v3/lego/sets/?key=" + rBApiKey + "&search=" + searchStr)
        .then(response =>{
            return response.json();
        })
        .then(response=>{
			res.send({"data":response.results});
        })
})

router.get('/readSetParts',(req,res,next)=>{
    const id = req.query.id;
    const sql = "SELECT * FROM " + id;
    id.length<10?
    res.send({response:'no parts'}):
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send({response:result});
    });
})

module.exports = router;