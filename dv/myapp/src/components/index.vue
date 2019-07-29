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
							<h3 class="chart-title"></h3>
							<div class="chart-div">
							</div>
						</div>
					</div>
				</div>
				<div class="flex-row">
					<div class="flex-cell flex-cell-lc">
						<div class="chart-wrapper">
							<h3 class="chart-title">温度折线图</h3>
							<div class="chart-div">
                                <canvas id="c1"></canvas>
                                <canvas id="c2"></canvas>
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
       num(){
         if((160-this.num[0])>=80){
                a3.play();
            }else{
                a3.pause()
            }
            //console.log(this.num)
       }
       
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
            //隔两秒随机改变num的值
            //this.num=60+Math.floor(Math.random()*100)
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
                //this.open()
                this.$message({
                    message:"警告！警告！温度过高！请及时处理",
                    type:"error",
                    duration:1500
                })
            }else if((160-this.num[0])>=50&&(160-this.num[0])<80){
                ctx1.strokeStyle="#ff0"
                //a3.pause()
                this.$message({
                    message:"警告！温度增高，请注意",
                    type:"warning",
                    duration:1500
                })
            }else{
                ctx1.strokeStyle="#0f0"
                //a3.pause()
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
        open() {
            this.$message({
                message:'警告！警告！温度过高！请及时处理！',
                type: 'warning',
		        duration:1500
            });
        },
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
        c1.width=w;c1.height=h;
        var _this=this;
        setInterval(function(){
            _this.nowtime= new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日"+" "+("0"+new Date().getHours()).slice(-2)+":"+("0"+new Date().getMinutes()).slice(-2)+":"+("0"+new Date().getSeconds()).slice(-2)
        },1000)
        
    },
    created() {
        
        var url="ws://127.0.0.1:9001";
        var c=new WebSocket(url)
        var a=[100]
        c.onmessage=function(e){
            a.unshift(parseInt(e.data))
        }
        //console.log(a)
        this.num=a;
        //console.log(this.num)
    },
    updated() {
        //this.changeTime() 
        this.draw()  
           
    },
}
</script>
<style scoped>
    .d{
        width: 100%;
        height: 100%;
        position: relative;
    }
    #c4{
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
</style>
