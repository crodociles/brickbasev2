var express = require('express');
var router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

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

router.get('/addNewSet',(req,res,next)=>{
    const setData = JSON.parse(req.query.setData);
	const id = uuidv4().replace(/-/g,"").substring(0,12);
	fetch("https://rebrickable.com/api/v3/lego/sets/" + setData.set_num + "/parts/?key=" + rBApiKey + "&inc_minifig_parts=1&inc_color_details=0&page_size=9999")
	.then(response=>{
		return response.json()
	})
	.then(response=>{
		
		const removedSparePartDetails = response.results.filter(item=>{
			return item.is_spare === false
		})
		
		const parts = removedSparePartDetails.map(item=>{
			return (
				'("' + item.part.name + '", ' +
				'"' + item.part.part_num + '", ' +
				'"' + item.part.part_img_url + '", ' +
				'"' + item.color.name + '", ' +
				'"' + item.id + '", ' +
				'"' + item.quantity + '", ' +
				'"0")'
			)
		});


		let objectForWrite = {
			id,
			name: setData.name,
			set_num: setData.set_num,
			set_img_url:setData.set_img_url,
			year:setData.year,
			instructions:0,
			notes:"",
			theme_id:setData.theme_id,
			part_details: parts
		};

		const sql = `INSERT INTO sets (id,name, set_num,set_img_url,year,instructions,notes,theme_id) VALUES ('${id}',"${objectForWrite.name}",'${objectForWrite.set_num}','${objectForWrite.set_img_url}','${objectForWrite.year}','${objectForWrite.instructions}','${objectForWrite.notes}','${objectForWrite.theme_id}')`
		const partTableCreate = `CREATE TABLE ${id} (name TEXT(255), part_num VARCHAR(255), part_img_url VARCHAR(255), color VARCHAR(255), id VARCHAR(255), quant VARCHAR(255), quant_in_set VARCHAR(255))`;
		const partsData = `INSERT INTO ${id} (name, part_num, part_img_url, color, id, quant, quant_in_set) VALUES ${parts.join(',')}`;

		con.query(sql,(err,result)=>{
			if (err) throw err;
			console.log(result);
			con.query(partTableCreate,(err,result)=>{
				if(err) throw err;
				console.log(result);
				con.query(partsData,(err,result)=>{
					if(err) throw err;
					console.log(result);
					res.send({response:id})
				})
			})
		})

	})


})

router.get('/updateInstructions',(req,res,next)=>{
	const id = req.query.id;
	const inst = req.query.instructions==="true"?1:0;
	con.query(`UPDATE sets SET instructions = '${inst}' WHERE id= '${id}'`);
	res.send({'message':'done'})
})

router.get('/updateNotes',(req,res,next)=>{
	const id = req.query.id;
	const notes = req.query.notes;
	con.query(`UPDATE sets SET notes = '${notes}' WHERE id= '${id}'`,(err,result)=>{
		if(err) throw err;
		console.log(result);
	});
	res.send({'message':'done'})
})

router.get('/updateAllParts',(req,res,next)=>{
	const id = req.query.setId;
	con.query(`SELECT * FROM ${id}`,(err,result)=>{
		if(err) throw err;
		result.forEach(item=>{
			con.query(`UPDATE ${id} SET quant_in_set = ${item.quant} WHERE id = ${item.id}`,(err,result)=>{
				if(err) throw err;
				console.log(result);
			})
		})
		res.send({response:'done'})
	})
})

router.get('/updatePartQuantity', (req,res,next)=>{
	const setId = req.query.setId;
	const newQuant = req.query.newQuant;
	const partId = req.query.partId;
	console.log(setId,newQuant,partId);
	if(newQuant!==""){
		const sql = `UPDATE ${setId} SET quant_in_set = ${newQuant} WHERE id = ${partId}`;
		con.query(sql,(err,result)=>{
			if (err) throw err;
			console.log(result);
		})
		res.send({message:'done'})
	}else{
		res.send({message:'invalid number'})
	}

})

router.get('/updateSold', (req,res,next)=>{
	const setId = req.query.setId;
	const date = req.query.date;
	const price = req.query.price;

	con.query(`SELECT * FROM sets WHERE id='${setId}';`,(err,result)=>{
		if (err) throw err;
		const addSold = `INSERT INTO sold (id,name,set_num,set_img_url,theme_id,instructions,sold_date,sold_price,notes,year) VALUES ('${result[0].id}',"${result[0].name}",'${result[0].set_num}','${result[0].set_img_url}','${result[0].theme_id}','${result[0].instructions}','${date}','${price}','${result[0].notes}','${result[0].year}')`;
		con.query(addSold,(err,result)=>{
			if(err) throw err;
			console.log(result);
			con.query(`DELETE FROM sets WHERE id='${setId}'`,(err,result)=>{
				if(err) throw err;
				console.log(result);
				res.send({response:"done"})
			})
		})
	})
})

router.get('/updateRelist', (req,res,next)=>{
	const setId = req.query.setId;

	con.query(`SELECT * FROM sold WHERE id='${setId}';`,(err,result)=>{
		if (err) throw err;
		const addSold = `INSERT INTO sets (id,name,set_num,set_img_url,theme_id,instructions,notes,year) VALUES ('${result[0].id}',"${result[0].name}",'${result[0].set_num}','${result[0].set_img_url}','${result[0].theme_id}','${result[0].instructions}','${result[0].notes}','${result[0].year}')`;
		con.query(addSold,(err,result)=>{
			if(err) throw err;
			console.log(result);
			con.query(`DELETE FROM sold WHERE id='${setId}'`,(err,result)=>{
				if(err) throw err;
				console.log(result);
				res.send({response:"done"})
			})
		})
	})
})

router.get('/updateArchiveSet', (req,res,next)=>{
	const setId = req.query.setId;
	const dropSQL = `DROP TABLE ${setId}`;
	const updateSQL = `UPDATE sold SET archived='1' WHERE id='${setId}'`
	console.log(dropSQL,updateSQL);
	con.query(dropSQL,(err,result)=>{
		if (err) throw err;
		console.log(result);
		con.query(updateSQL,(err,result)=>{
			if (err) throw err;
			console.log(result);
			res.send({response:"Archived"})
		})
	})
})

router.get('/updateSaveParts', (req,res,next)=>{
	const setId = req.query.setId;
	const parts = req.query.parts;
	console.log(setId,parts);

})

module.exports = router;