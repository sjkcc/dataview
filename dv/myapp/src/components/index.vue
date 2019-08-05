<template>
    <div>
        <header id="header">
			<h3 class="header-title">矿洞环境监测</h3>
		</header>
		
		<div id="container">
			<div id="flexCon">
				<div class="flex-row">
					<div class="flex-cell flex-cell-l">
						<div class="chart-wrapper">
							<div class="chart-div">
								<div class="chart-loader"><div class="loader"></div></div>
                                <div class="time">{{nowtime}}</div>
                                <div class="switch">
                                    <div class="switch-button"> 
                                        <div class="switch-button-inner"></div>
                                    </div>
                                </div>
                            </div>
						</div>
					</div>
					<div class="flex-cell flex-cell-c">
						<div class="chart-wrapper">
							<h3 class="chart-title">实时温度 {{160-num[0]}}℃</h3>
							<div class="chart-div">
                                <div class="d">
                                    <canvas id="c3"></canvas>
                                    <canvas id="c4"></canvas>
                                </div>
                                    <!-- <input type="checkbox" id="c3" v-model="check">音乐 -->
                                <audio id="a3" src="../assets/w.mp3"></audio>
                            </div>
						</div>
					</div>
					<div class="flex-cell flex-cell-r">
						<div class="chart-wrapper">
							<h3 class="chart-title">历史温度表</h3>
							<div class="chart-div">
                                <div class="table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    当前时间
                                                </td>
                                                <td>
                                                    温度/℃
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(n,i) of num" :key="i">
                                                <td>{{(new Date().getMonth()+1)+"月"+new Date().getDate()+"日"+" "+("0"+new Date().getHours()).slice(-2)+":"+("0"+new Date().getMinutes()).slice(-2)+":"+("0"+new Date().getSeconds()).slice(-2)}}</td>
                                                <td>{{160-n}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex-row">
					<div class="flex-cell flex-cell-lc">
						<div class="chart-wrapper">
							<h3 class="chart-title">温度折线图</h3>
							<div class="chart-div">
                                <div class="d">
                                    <canvas id="c1"></canvas>
                                    <canvas id="c2"></canvas>
                                </div>
							</div>
						</div>
					</div>
					<div class="flex-cell flex-cell-r">
						<div class="chart-wrapper">
							<h3 class="chart-title"></h3>
							<div class="chart-div">
                                
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            num:[100],
            check:true,
            nowtime:new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日"+" "+("0"+new Date().getHours()).slice(-2)+":"+("0"+new Date().getMinutes()).slice(-2)+":"+("0"+new Date().getSeconds()).slice(-2)
        }
    },
    watch: {
       /*num(){
         if((160-this.num[0])>=80){
                a3.play();
            }else{
                a3.pause()
            }
            //console.log(this.num)
       }*/
       
    },
    methods: {
        onchange(){
            var a3=document.getElementById("a3")
            if((160-this.num[0])>=80){
                a3.play();
            }else{
                a3.pause()
            }
        },
        draw(){
            var c3=document.getElementById("c3")
            var ctx=c3.getContext("2d")
            var c4=document.getElementById("c4")
            var ctx1=c4.getContext("2d")
            //绘制温度计外框
            //console.log(this.num)
            ctx.beginPath();
            ctx.moveTo(50,60)
            ctx.lineTo(50,160)
            ctx.lineWidth=20
            ctx.lineCap="round"
            ctx.strokeStyle="#fff"
            ctx.stroke();
            //绘制温度计里水银柱
            ctx.beginPath();
            ctx.moveTo(50,this.num[0])
            ctx.lineTo(50,160)
            ctx.lineWidth=20
            ctx.lineCap="round"
            if((160-this.num[0])>=80){
                ctx.strokeStyle="#f00"
            }else if((160-this.num[0])>=50&&(160-this.num[0])<80){
                ctx.strokeStyle="#ff0"
            }else{
                ctx.strokeStyle="#0f0"
            }
            ctx.stroke();
            
            //绘制温度计下方球体
            ctx.beginPath();
            ctx.arc(50,180,20,-60*Math.PI/180,240*Math.PI/180)
            if((160-this.num[0])>=80){
                ctx.fillStyle="#f00"
            }else if((160-this.num[0])>=50&&(160-this.num[0])<80){
                ctx.fillStyle="#ff0"
            }else{
                ctx.fillStyle="#0f0"
            }
            ctx.fill()
            
            //绘制温度文本
            ctx.beginPath();
            ctx.font="15px SimHei"
            ctx.fillStyle="#000"
            ctx.fillText((160-this.num[0])+"℃",35,188)
            
            //绘制警报器
            ctx1.beginPath();
            ctx1.moveTo(200,130)
            ctx1.lineTo(200,150)
            if((160-this.num[0])>=80){
                ctx1.strokeStyle="#f00"
                this.$message({
                    message:"警告！警告！温度过高！请及时处理",
                    type:"error",
                    duration:1500
                })
            }else if((160-this.num[0])>=50&&(160-this.num[0])<80){
                ctx1.strokeStyle="#ff0"
                this.$message({
                    message:"警告！温度增高，请注意",
                    type:"warning",
                    duration:1500                              
                })
            }else{
                ctx1.strokeStyle="#0f0"
            }
            ctx1.lineWidth=20
            ctx1.lineCap="round"
            ctx1.stroke()

            ctx1.beginPath();
            ctx1.lineWidth=5
            ctx1.fillStyle="#aaa"
            ctx1.fillRect(180,145,40,15)

            ctx1.beginPath();
            ctx1.moveTo(175,160)
            ctx1.lineTo(225,160)
            ctx1.strokeStyle="#ccc"
            ctx1.lineWidth=10
            ctx1.lineCap="round"
            ctx1.stroke()
        },
        drawxy(){
            var c1=document.getElementById("c1")
            var ctx=c1.getContext("2d")
            //绘制x轴和y轴
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#395B73";
            ctx.moveTo(100,20);
            ctx.lineTo(100,c1.offsetHeight-50);
            ctx.lineTo(c1.offsetWidth-10,c1.offsetHeight-50);
            ctx.stroke()
            //绘制x轴的箭头
            ctx.beginPath();
            ctx.moveTo(100,20)
            ctx.lineTo(90,40)
            ctx.lineTo(110,40)
            ctx.closePath()
            ctx.lineWidth =5;
            ctx.fillStyle="#395B73"
            ctx.fill()
            //绘制y轴的箭头
            ctx.beginPath()
            ctx.moveTo(c1.offsetWidth-10,c1.offsetHeight-50)
            ctx.lineTo(c1.offsetWidth-30,c1.offsetHeight-60)
            ctx.lineTo(c1.offsetWidth-30,c1.offsetHeight-40)
            ctx.closePath()
            ctx.lineWidth =5;
            ctx.fillStyle="#395B73"
            ctx.fill()
            //绘制y轴文本
            ctx.beginPath()
            ctx.font="20px 黑体"
            if(c1.offsetHeight<300){
                ctx.fillText("0",70,c1.offsetHeight-50)
                ctx.fillText("25",70,c1.offsetHeight-75)
                ctx.fillText("50",70,c1.offsetHeight-100)
                ctx.fillText("75",70,c1.offsetHeight-125)
                ctx.fillText("100",60,c1.offsetHeight-150)
            }else{
                ctx.fillText("0",70,c1.offsetHeight-50)
                ctx.fillText("25",70,c1.offsetHeight-100)
                ctx.fillText("50",70,c1.offsetHeight-150)
                ctx.fillText("75",70,c1.offsetHeight-200)
                ctx.fillText("100",60,c1.offsetHeight-250)
            }

        },
        draw1(){
            var c2=document.getElementById("c2")
            var ctx=c2.getContext("2d")
            //绘制折线
            
            for (var i=this.num.length-1,j=-1;i>=0;i--){
                //起始坐标
                j++;
                //console.log(j)
                var k=parseInt((c2.offsetWidth-200)/30)
                if(j>k){
                    ctx.clearRect(0,0,c2.offsetWidth,c2.offsetHeight)
                    for(var i=k,j=-1;i>=0;i--){
                        j++;
                        if(c2.offsetHeight<300){
                            var numsY = c2.offsetHeight-50-(160-this.num[i])
                            var numsNY = c2.offsetHeight-50-(160-this.num[i-1]);
                        }else{
                            var numsY = c2.offsetHeight-50-(160-this.num[i])*2;
                            var numsNY = c2.offsetHeight-50-(160-this.num[i-1])*2;
                        }
                        var numsX = j*30+100;
                        //终止坐标
                        var numsNX = (j+1)*30+100;
                        ctx.beginPath();
                        ctx.moveTo(numsX,numsY);
                        ctx.lineTo(numsNX,numsNY);
                        ctx.lineWidth =4;
                        ctx.strokeStyle = "#0f0";
                        ctx.stroke(); 
                        //ctx.closePath();
                        ctx.beginPath()
                        ctx.font="20px 黑体"
                        ctx.fillStyle="#f00"
                        ctx.fillText(160-this.num[i],numsX,numsY)
                        ctx.beginPath()
                        ctx.arc(numsX,numsY,5,0*Math.PI/180,360*Math.PI/180)
                        ctx.fillStyle="#ff0"
                        ctx.fill()
                        ctx.clearRect(0,c2.offsetHeight-50,c2.offsetWidth,c2.offsetHeight)
                        ctx.beginPath()
                        ctx.fillStyle="#395B73"
                        ctx.fillText((new Date().getMonth()+1)+"月"+new Date().getDate()+"日"+" "+("0"+new Date().getHours()).slice(-2)+":"+("0"+new Date().getMinutes()).slice(-2)+":"+("0"+new Date().getSeconds()).slice(-2),numsX-80,c2.offsetHeight-30)
                    }
                }else{
                    ctx.clearRect(0,c2.offsetHeight-50,c2.offsetWidth,c2.offsetHeight)
                    if(c2.offsetHeight<300){
                        var numsY = c2.offsetHeight-50-(160-this.num[i])
                        var numsNY = c2.offsetHeight-50-(160-this.num[i-1]);
                    }else{
                        var numsY = c2.offsetHeight-50-(160-this.num[i])*2;
                        var numsNY = c2.offsetHeight-50-(160-this.num[i-1])*2;
                    }
                    var numsX = j*30+100;
                    var numsNX = (j+1)*30+100;
                    ctx.beginPath();
                    ctx.moveTo(numsX,numsY);
                    ctx.lineTo(numsNX,numsNY);
                    ctx.lineWidth =4;
                    ctx.strokeStyle ="#0f0";
                    ctx.stroke(); 
                    ctx.closePath();
                    ctx.beginPath()
                    ctx.font="20px 黑体"
                    ctx.fillStyle="#f00"
                    ctx.fillText(160-this.num[i],numsX,numsY)
                    ctx.beginPath()
                    ctx.arc(numsX,numsY,5,0*Math.PI/180,360*Math.PI/180)
                    ctx.fillStyle="#ff0"
                    ctx.fill()
                    ctx.beginPath()
                    ctx.fillStyle="#395B73"
                    ctx.fillText((new Date().getMonth()+1)+"月"+new Date().getDate()+"日"+" "+("0"+new Date().getHours()).slice(-2)+":"+("0"+new Date().getMinutes()).slice(-2)+":"+("0"+new Date().getSeconds()).slice(-2),numsX-80,c2.offsetHeight-30)
                }
            }      
        }
    },
    mounted() {       
        var d=document.querySelector(".d")
        var c3=document.getElementById("c3")
        var c4=document.getElementById("c4")
        var c1=document.getElementById("c1")
        var c2=document.getElementById("c2")
        var w=d.offsetWidth;
        var h=d.offsetHeight;
        c3.width=w;c3.height=h;
        c4.width=w;c4.height=h;
        c1.width=c1.parentElement.offsetWidth;c1.height=c1.parentElement.offsetHeight;
        c2.width=c2.parentElement.offsetWidth;c2.height=c2.parentElement.offsetHeight;
        var _this=this;
        _this.drawxy();
        var time=document.querySelector(".time")
        setInterval(function(){
            time.innerHTML= new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日"+" "+("0"+new Date().getHours()).slice(-2)+":"+("0"+new Date().getMinutes()).slice(-2)+":"+("0"+new Date().getSeconds()).slice(-2)
        },1000)
        function Switch(node) {
            this.switchRoot = node;
            this.switchRoot.onclick = this.switchClickEventHanlder;
        }
        var ws= null;
        var a=[100]
        var url="ws://127.0.0.1:9001";
        ws=new WebSocket(url)
        ws.onmessage=function(e){
            a.unshift(parseInt(e.data))
        }
        console.log(a)
        //this.num=a;
        Switch.prototype.switchClickEventHanlder = function (e) {
            if(e.target.className.indexOf("switch-button") < 0) return;
            if(!this.classList.contains("checked")) {
                this.classList.add("checked");
                console.log("打开了链接")
                _this.num=a;
            } else{
                this.classList.remove("checked");
                console.log("关闭了链接")
                _this.num=a.slice(0,22)
            }
            this.checked = !this.checked;
        };
        var switches = document.querySelectorAll(".switch");
        if(typeof switches !== "undefined" && switches.length) {
        for(var i = switches.length - 1; i >=0; --i){
            new Switch(switches[i]);
        }
        }
        
},
    created() {
          


          
    },
    updated(){
        this.draw()  
        this.draw1()
    },
}
</script>
<style scoped>
    .d{
        width: 100%;
        height: 100%;
        position: relative;
    }
    #c4,#c2{
        position: absolute;
        top: 0;
        left: 0;
    }
    #c1{
        /* border:1px solid #ccc; */
    }
    #header {
        position:relative;
        height:72px;
        background:url("../assets/img/header.png") 0 0 / 100% 100% no-repeat;
        overflow:hidden;
    }
    .header-title {line-height:64px;text-align:center;font-size:32px;font-weight:400;color:#bef2ff;}
    #container {position:absolute;top:64px;bottom:15px;left:0;right:0;}

    #flexCon {
        height:100%;
        display:-webkit-flex;
        display:-ms-flexbox;
        display:flex;
        -webkit-flex-direction:column;
        -ms-flex-direction:column;
        flex-direction:column;
    }
    .flex-row {
        -webkit-flex:1;
        -ms-flex:1;
        flex:1;
        display:-webkit-flex;
        display:-ms-flexbox;
        display:flex;
    }
    .flex-cell {-webkit-flex:1;-ms-flex:1;flex:1;padding:15px;}
    .flex-cell-l,
    .flex-cell-r {-webkit-flex:2;-ms-flex:2;flex:2;}
    .flex-cell-c {-webkit-flex:3;-ms-flex:3;flex:3;}
    .flex-cell-lc {-webkit-flex:5;-ms-flex:5;flex:5;}
    .flex-cell-r .table{
        width: 230px;
        height: 200px;
        margin: auto;
        overflow: auto;
        margin-bottom: 10px;
    }
    .flex-cell-r table{
        width: 100%;
        border: 1px solid #ffff00;
        color:#ffff00;
    }
    .flex-cell-r table td{
        border: 1px solid #ffff00;
        text-align: center;
        padding: 5px
    }
    .chart-wrapper {position:relative;height:100%;}
    .chart-title {height:30px;font-size:20px;font-weight:normal;color:#5ac8fa;}
    .chart-div {
        position:absolute;
        top:30px;
        bottom:0;
        left:0;
        right:0;
        border-style:solid;
        border-width:10px 10px 10px;
        border-image:url("../assets/img/chart-wrapper.png") 10 10 10 fill / 1 / 0 repeat;
    }

    /* media query */
    @media (max-width:1900px) {
        #header {height:48px;}
        #container {top:36px;bottom:10px;}
        .header-title {line-height:42px;font-size:22px;}
        .flex-cell {padding:10px;}
        .chart-title {height:24px;font-size:16px;}
        .chart-div {top:24px;}
    }
    .time{
        width: 200px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #0f0;
        position:absolute;
        right:10px;
        top:20px;
        border:2px solid rgba(215, 252, 9, 0.753);
        border-radius:5px;
    }
    /* chart-loader */
    .chart-loader {
        position:absolute;
        top:0;
        left:0;
        z-index:99;
        width:100%;
        height:100%;
        background:rgba(255, 255, 255, 0);
        transition:all .8s;
    }
    .chart-loader .loader {
        position:absolute;
        left:10px;
        top:10px;
        width:60px;
        height:60px;
        /* margin:-30px 0 0 -30px; */
        border:5px solid transparent;
        border-top-color:#3498db;
        border-radius:50% !important;
        -webkit-animation:spin 2s linear infinite;
        animation:spin 2s linear infinite;
    }
    .chart-loader .loader:before {
        content:"";
        position:absolute;
        top:3px;
        left:5px;
        right:5px;
        bottom:5px;
        border:4px solid transparent;
        border-top-color:#e74c3c;
        border-radius:50% !important;
        -webkit-animation:spin 3s linear infinite;
        animation:spin 3s linear infinite;
    }
    .chart-loader .loader:after {
        content:"";
        position:absolute;
        top:9px;
        left:10px;
        right:10px;
        bottom:10px;
        border:3px solid transparent;
        border-top-color:#f9c922;
        border-radius:50% !important;
        -webkit-animation:spin 1.5s linear infinite;
        animation:spin 1.5s linear infinite;
    }
    .chart-done .chart-loader {display:none;} 
    @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg)
        }
        100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg)
        }
    }
    .switch {
        width:70px;
        height:120px;
        padding: 5px 5px;
        margin:auto;
        position:absolute;
        top:65px;
        left:150px;
        z-index: 100;
    }
    .switch-button {
        height:100%;
        width:100%;
        background: -webkit-linear-gradient(#f3f3f3, #fff);
        background: -moz-linear-gradient(#f3f3f3, #fff);
        background: -o-linear-gradient(#f3f3f3, #fff);
        background: -ms-linear-gradient(#f3f3f3, #fff);
        background: linear-gradient(#f3f3f3, #fff);
        -webkit-border-radius: 30px;
        border-radius: 30px;
        overflow: auto;
        position: relative;
        top: 5%;
        left: 7%;
        cursor: pointer;
        -webkit-box-shadow: 0 16px 8px -8px rgba(0,0,0,0.33) inset, 0 0 3px rgba(0,0,0,0.85);
        box-shadow: 0 16px 8px -8px rgba(0,0,0,0.33) inset, 0 0 3px rgba(0,0,0,0.85);
        z-index: 2;
    }
    .switch-button-inner {
        width: 98%;
        height: 87%;
        margin: 0 1%;
        background: -webkit-linear-gradient(#9d9d9d, #dedede, #f0f0f0);
        background: -moz-linear-gradient(#9d9d9d, #dedede, #f0f0f0);
        background: -o-linear-gradient(#9d9d9d, #dedede, #f0f0f0);
        background: -ms-linear-gradient(#9d9d9d, #dedede, #f0f0f0);
        background: linear-gradient(#9d9d9d, #dedede, #f0f0f0);
        position: absolute;
        bottom: 0;
        -webkit-border-radius: 25px;
        border-radius: 25px;
        position: absolute;
        z-index: 3;
    }
    .switch-button-inner:before {
        content: "开始检测";
        font-size: 10px;
        height: 15px;
        width: 50px;
        text-align: center;
        background-color: rgba(0,0,0,0.1);
        border-bottom: 2px solid rgba(255,255,255,0.5);
        position: absolute;
        top: 10px;
        left:9px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2) inset;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2) inset;
    }
    .switch-button-inner:after {
        content: "关闭监测";
        font-size: 10px;
        height: 15px;
        width: 50px;
        text-align: center;
        border: 2px solid rgba(0,0,0,0.08);
        position: absolute;
        left:8px;
        bottom: 10px;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        -webkit-box-shadow: 0 2px 0 rgba(255,255,255,0.7);
        box-shadow: 0 2px 0 rgba(255,255,255,0.7);
    }
    .switch.checked .switch-button {
        background-image: -webkit-linear-gradient(#fff, #f3f3f3);
        background-image: -moz-linear-gradient(#fff, #f3f3f3);
        background-image: -o-linear-gradient(#fff, #f3f3f3);
        background-image: -ms-linear-gradient(#fff, #f3f3f3);
        background-image: linear-gradient(#fff, #f3f3f3);
        -webkit-box-shadow: 0 -3px 8px rgba(255,255,255,0.5) inset, 0 -15px 0px rgba(0,0,0,0.33) inset, 0 0 3px rgba(0,0,0,0.85);
        box-shadow: 0 -3px 8px rgba(255,255,255,0.5) inset, 0 -15px 0px rgba(0,0,0,0.33) inset, 0 0 3px rgba(0,0,0,0.85);
    }
    .switch.checked .switch-button-inner {
        background: -webkit-linear-gradient(#ddd, #dedede, #fff);
        background: -moz-linear-gradient(#ddd, #dedede, #fff);
        background: -o-linear-gradient(#ddd, #dedede, #fff);
        background: -ms-linear-gradient(#ddd, #dedede, #fff);
        background: linear-gradient(#ddd, #dedede, #fff);
        bottom: auto;
        top:0px;
    }
    .switch.checked .switch-button-inner:before {
        height: 18px;
    }
    .switch.checked .switch-button-inner:after {
        height: 16px;
    }
</style>
