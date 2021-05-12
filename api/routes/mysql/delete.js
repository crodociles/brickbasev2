var express = require('express');
var router = express.Router();
const mysql = require('mysql');

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

router.get('/deleteSet',(req,res,next)=>{
    const id = req.query.setId;
    con.query(`DELETE FROM sets WHERE id='${id}'`,(err,result)=>{
        if(err)throw err;
        console.log(result);
    })
    con.query(`DROP TABLE ${id}`,(err,result)=>{
        if(err)throw err;
        console.log(result);
    })
    res.send({response:"done"});
})

module.exports = router;