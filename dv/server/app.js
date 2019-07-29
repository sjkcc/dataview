const express=require('express');
const cors=require("cors")
var server=express();
server.use(cors({
	origin:["http://127.0.0.1:8080",
	"http://localhost:8080"],
	credentials:true
 }))
server.listen(3001);
server.use(express.static('public'));
var arr=[];
server.get("/data",(req,res)=>{
var num=170+Math.floor(Math.random()*200)
var time=Date();
var obj={
	num:num,
	time:time
};
arr.push(obj)
res.send(arr)
})
