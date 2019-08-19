const express=require('express');
const cors=require("cors")
const pool=require("./pool.js");
var server=express();
server.use(cors({
	origin:["http://127.0.0.1:8080",
	"http://localhost:8080"],
	credentials:true
 }))
server.listen(3001);
server.get("/temp",(req,res)=>{
	var temp=req.query.temp
	if(!temp){
		res.send("null")
	return
	}
	pool.query("select * from temp where t_temperature like concat(?,'%')",[temp],(err,result)=>{
		if(err) throw err;
		res.send(result)
	})
})
server.get("/tempAll",(req,res)=>{
	pool.query("select * from temp ",(err,result)=>{
		if(err) throw err;
		res.send(result)
	})
})
server.get("/del",(req,res)=>{
	var tid=req.query.id
	pool.query("delete from temp where t_id=?",[tid],(err,result)=>{
		if(err) throw err;
		res.send(result)
	})
})
server.get("/dels",(req,res)=>{
	var tid=req.query.id
	pool.query("delete from temp where t_id in ?",[tid],(err,result)=>{
		if(err) throw err;
		res.send(result)
	})
})
