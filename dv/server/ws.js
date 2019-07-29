const ws=require("ws");
var server =new ws.Server({port:9001});
console.log("ws 服务器开始监听端口");

server.on("connection",socket=>{
    var num=100;
    var timer=setInterval(function(){
        num=60+Math.floor(Math.random()*100)
        socket.send(num)
    },2000)
    socket.on("message",msg=>{
        console.log("服务器接收到的信息"+msg)
    })
    socket.on("close",()=>{
        clearInterval(timer)
    })
})