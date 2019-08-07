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
                                <!-- <div class="switch">
                                    <div class="switch-button"> 
                                        <div class="switch-button-inner">
                                            <div class="on">开始监测</div>
					                        <div class="off">停止监测</div> 
                                        </div>
                                    </div>
                                </div> -->
                                <div class="button ">
                                    <span class="hole">
                                        <span class="switch">
                                        <div class="on"><span>开始监测</span></div>
                                        <div class="off"><span>停止监测</span></div>
                                        </span>
                                    </span>
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
                                        <thead style="position: fixed;width:250px;top: 130px;right:151px;">
                                            <tr><td colspan="2">共有{{num.length}}条数据</td></tr>
                                            <tr>
                                                <td style="width:167px">
                                                    当前时间
                                                </td>
                                                <td>
                                                    温度/℃
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(n,i) of num" :key="i">
                                                <td style="width:167px">{{(new Date().getMonth()+1)+"月"+new Date().getDate()+"日"+" "+("0"+new Date().getHours()).slice(-2)+":"+("0"+new Date().getMinutes()).slice(-2)+":"+("0"+new Date().getSeconds()).slice(-2)}}</td>
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
            num:[],
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

            //绘制圆环温度显示
            ctx1.clearRect(380,135,380,160)
            ctx1.beginPath();
            ctx1.lineWidth=15;
            ctx1.arc(400,150,100,0,360*Math.PI/180)
            ctx1.strokeStyle="#aaa";
            ctx1.stroke()

            ctx1.beginPath();
            ctx1.lineWidth=15;
            ctx1.arc(400,150,100,-90*Math.PI/180,(-90+3.6*(160-this.num[0]))*Math.PI/180)
            if((160-this.num[0])>=80){
                ctx1.strokeStyle="#f00"
            }else if((160-this.num[0])>=50&&(160-this.num[0])<80){
                ctx1.strokeStyle="#ff0"
            }else{
                ctx1.strokeStyle="#0f0"
            }
            ctx1.stroke()
            ctx.beginPath();
            ctx1.font="30px 黑体"
            
            ctx1.fillText(160-this.num[0]+"℃",380,160)

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
        _this.num=[100,120,130]
        var ws= null;
        var a=[100,120,130]
        var url="ws://127.0.0.1:9001";
        ws=new WebSocket(url)
        ws.onmessage=function(e){
            a.unshift(parseInt(e.data))
        }
        var c2=document.getElementById("c2")
        var k=parseInt((c2.offsetWidth-200)/30)
        // var t=document.querySelector(".switch-button-inner")
        // var s=document.querySelector(".switch")
        // var on=document.querySelector(".switch-button-inner .on")
        // var off=document.querySelector(".switch-button-inner .off")
        var s=document.querySelector(".switch")
        var on=document.querySelector(".switch .on")
        var off=document.querySelector(".switch .off")
        on.onclick = function () {
            //console.log(s.classList)
            if(!s.classList.contains("checked")) {
                s.classList.add("checked");
                console.log("打开了链接")
                _this.num=a
                console.log(a)
            }
        };
        off.onclick = function () {
            //console.log(s.classList)
            if(s.classList.contains("checked")) {
                s.classList.remove("checked");
                console.log("关闭了链接")
                _this.num=a.slice(0,k+1)
            } 
        };
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
        width: 250px;
        height: 180px;
        margin: auto;
        overflow: auto;
        margin-top:80px;
    }
    .flex-cell-r table{
        width: 100%;
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
    /*.switch {
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
        font-size: 10px;

    }
    .switch-button-inner .on {
        height:30px;
        width:50px;
        text-align: center;
        line-height: 30px;
        background-color: rgba(0,0,0,0.1);
        border-bottom: 2px solid rgba(255,255,255,0.5);
        position: absolute;
        top: 10px;
        left:9px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2) inset;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2) inset;
        cursor: pointer;
    }
    .switch-button-inner .off{
        height:30px;
        width: 50px;
        text-align: center;
        line-height: 30px;
        border: 2px solid rgba(0,0,0,0.08);
        position: absolute;
        left:8px;
        bottom: 10px;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        -webkit-box-shadow: 0 2px 0 rgba(255,255,255,0.7);
        box-shadow: 0 2px 0 rgba(255,255,255,0.7);
        cursor: pointer;
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
    }*/


    .button {
        position: absolute;
        top:100px;
        left:300px;
        width: 120px;
        height: 148px;
        background-image: linear-gradient(to bottom, #464A54 0%, #2C2225 100%);
        border-radius: 6px;
        box-shadow: 0 -5px 0px #464649, 0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 1px #66696E inset, 4px 0 0 rgba(0, 0, 0, 0.1) inset, -4px 0 0 rgba(0, 0, 0, 0.1) inset, 0 -8px 2px rgba(0, 0, 0, 0.1) inset;
        z-index: 100;
    }
    .button .hole {
        position: absolute;
        top: 10px;
        left: 10px;
        display: block;
        width: 100px;
        height: 125px;
        overflow: hidden;
        background-color: #090909;
        border-radius: 8px;
        box-shadow: 0 -2px 1px rgba(255, 255, 255, 0.25) inset, 0 2px 1px rgba(255, 255, 255, 0.2) inset;
    }
    .button .switch {
        position: absolute;
        top: 5px;
        left: 5px;
        display: block;
        width: 90px;
        height: 115px;
        background-image: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.07) 0%, transparent 80%), radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 80%), radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 50%), -webkit-gradient(linear, left top, left bottom, from(#882626), to(#290606));
        background-image: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.07) 0%, transparent 80%), radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 80%), radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 50%), linear-gradient(to bottom, #882626 0%, #290606 100%);
        background-size: 100% 80px, 100% 80px, 10px 10px, 100%;
        background-position: top left, bottom left, bottom left, center;
        background-repeat: no-repeat, no-repeat, repeat, no-repeat;
        border-radius: 8px;
        box-shadow: 2px 0 1px rgba(255, 255, 255, 0.1) inset, -2px 0 1px rgba(255, 255, 255, 0.1) inset, 0 -2px 2px rgba(255, 255, 255, 0.05) inset, 0 4px 2px rgba(0, 0, 0, 0.05) inset, 0 -25px 8px rgba(198, 45, 45, 0.5), 0 -25px 8px rgba(198, 45, 45, 0.3), 0 -20px 8px rgba(198, 45, 45, 0.4), 0 -15px 8px rgba(198, 45, 45, 0.5), 0 -10px 8px rgba(198, 45, 45, 0.6), 0 -5px 8px rgba(198, 45, 45, 0.9);
        transform-style: preserve3d;
        transform-origin: center center;
        transform: perspective(1500px) rotateX(-35deg) translateY(13px);
        transition: transform 200ms ease;
    }
    .button .switch:before {
        content: "";
        position: absolute;
        top: -2px;
        left: 5px;
        width: 85px;
        height: 5px;
        background-image: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, transparent 80%);
    }
    .button .switch .on {
        position: absolute;
        top:0px;
        left:0px;
        width:100%;
        height:50px;
        text-align:center;
        cursor: pointer;
        color:#fff;
    }
    .button .switch .on span{
        display:inline-block;
        padding:5px;
        margin-top:10px;
        box-shadow: 0 2px 20px white inset;
        border-radius:5px;
    }
    .button .switch .off {
        position: absolute;
        bottom:5px;
        left:0px;
        width:100%;
        height:50px;
        text-align:center;
        cursor: pointer;
        color:#fff;
    }
    .button .switch .off span{
        display:inline-block;
        padding:5px;
        margin-top:10px;
        box-shadow: 0 2px 20px white inset;
        border-radius:5px;
    }
    .button  .hole .switch.checked {
    background-image: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.07) 0%, transparent 80%), radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 80%), radial-gradient(ellipse at center, rgba(254, 244, 0, 0.5) 0%, rgba(254, 244, 0, 0.2) 30%, rgba(254, 244, 0, 0.1) 50%, transparent 80%), radial-gradient(ellipse at center, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 30%, transparent 50%), linear-gradient(to bottom, #B43222 0%, #A51810 100%);
    background-size: 100% 80px, 100% 80px, 100% 180px, 10px 10px, 100%;
    background-position: top left, bottom left, 0 30px, bottom left, center;
    background-repeat: no-repeat, no-repeat, no-repeat, repeat, no-repeat;
    border-radius: 8px;
    box-shadow: 4px 0 1px rgba(255, 255, 255, 0.15) inset, -4px 0 1px rgba(255, 255, 255, 0.15) inset, 0 4px 1px rgba(255, 255, 255, 0.15) inset, 0 -12px 8px rgba(0, 0, 0, 0.25) inset, 0 35px 8px rgba(128, 17, 5, 0.5), 0 25px 8px rgba(128, 17, 5, 0.3), 0 20px 8px rgba(128, 17, 5, 0.4), 0 15px 8px rgba(128, 17, 5, 0.5), 0 10px 8px rgba(128, 17, 5, 0.6), 0 5px 8px rgba(128, 17, 5, 0.9);
    transform: perspective(1500px) rotateX(40deg) translateY(-17px);
    }
    .button .hole .switch.checked:before {
    top: auto;
    bottom: -2px;
    }
    .button .hole .switch.checked:after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: calc(5%);
    width: 80px;
    height: 15px;
    border-radius: 50%;
    background-image: radial-gradient(ellipse at center, #FEF400 0%, rgba(254, 244, 0, 0.3) 60%, transparent 100%);
    filter: blur(8px);
    }
    .button .hole .switch.checked .on {
    color:#000;
    }
    .button .hole .switch.checked .off {
    color:#000;
    }
</style>
