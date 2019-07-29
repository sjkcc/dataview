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
								<!-- <div class="chart-loader"><div class="loader"></div></div> -->
							</div>
						</div>
					</div>
					<div class="flex-cell flex-cell-c">
						<div class="chart-wrapper">
							<h3 class="chart-title">实时温度 {{260-num[0]}}℃</h3>
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
							<div class="chart-div chart-done">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex-row">
					<div class="flex-cell flex-cell-lc">
						<div class="chart-wrapper">
							<h3 class="chart-title"></h3>
							<div class="chart-div chart-done">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
					<div class="flex-cell flex-cell-r">
						<div class="chart-wrapper">
							<h3 class="chart-title"></h3>
							<div class="chart-div chart-done">
								<div class="chart-loader"><div class="loader"></div></div>
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
            cw:0
        }
    },
    watch: {
        //a:this.num
        //"num":"onchange"
    },
    methods: {
        onchange(){
            var a3=document.getElementById("a3")
            if((260-this.num[0])>=80){
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
            console.log(this.cw)
            //隔两秒随机改变num的值
            //this.num=60+Math.floor(Math.random()*100)
            //绘制温度计外框
            //console.log(this.num)
            //ctx.clearRect(0,0,468,213)
            ctx.beginPath();
            ctx.moveTo(100,60)
            ctx.lineTo(100,260)
            ctx.lineWidth=40
            ctx.lineCap="round"
            ctx.strokeStyle="#fff"
            ctx.stroke();
            //绘制温度计里水银柱
            ctx.beginPath();  /*50,160 */
            ctx.moveTo(100,this.num[0])
            ctx.lineTo(100,260)
            ctx.lineWidth=40
            ctx.lineCap="round"
            if((260-this.num[0])/2>=80){
                ctx.strokeStyle="#f00"
            }else if((260-this.num[0])/2>=50&&(260-this.num[0])/2<80){
                ctx.strokeStyle="#ff0"
            }else{
                ctx.strokeStyle="#0f0"
            }
            ctx.stroke();
            
            //绘制温度计下方球体
            ctx.beginPath();/*50,180 */
            ctx.arc(100,300,40,-60*Math.PI/180,240*Math.PI/180)
            if((260-this.num[0])/2>=80){
                ctx.fillStyle="#f00"
            }else if((260-this.num[0])/2>=50&&(260-this.num[0])/2<80){
                ctx.fillStyle="#ff0"
            }else{
                ctx.fillStyle="#0f0"
            }
            ctx.fill()
            
            //绘制温度文本
            ctx.beginPath();
            ctx.font="25px SimHei"
            ctx.fillStyle="#000"
            ctx.fillText((260-this.num[0])/2+"℃",70,310)
            
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
                type: 'warning'
            });
        },
    },
    mounted() {
        var d=document.querySelector(".d")
        var c3=document.getElementById("c3")
        var c4=document.getElementById("c4")
        var w=d.offsetWidth;
        var h=d.offsetHeight;
        //console.log(parseInt(w*0.5))
        this.cw=w*0.5;
        //console.log(this.cw)
        c3.width=w;c3.height=h;
        c4.width=w;c4.height=h;
    },
    created() {
        setInterval(function(){ 
            //this.num=170+Math.floor(Math.random()*200)
        },1000)
        //var url="data";
        /*this.axios.get(url).then(result=>{
            console.log(result.data[0].num)
            this.num=result.data[0].num
        })*/
        //var c=null
        var url="ws://127.0.0.1:9001";
        var c=new WebSocket(url)
        var a=[100]
        c.onmessage=function(e){
            a.unshift(parseInt(e.data))
            //console.log(e)
        }
        //console.log(a)
        this.num=a;
        //console.log(this.num)
    },
    updated() {
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

    /* chart-loader */
    /*.chart-loader {
        position:absolute;
        top:0;
        left:0;
        z-index:99;
        width:100%;
        height:100%;
        background:rgba(255, 255, 255, 0);
        transition:all .8s;
    }*/
    /* .chart-loader .loader {
        position:absolute;
        left:50%;
        top:50%;
        width:60px;
        height:60px;
        margin:-30px 0 0 -30px;
        border:3px solid transparent;
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
        border:3px solid transparent;
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
    .chart-done .chart-loader {display:none;} */
    @-webkit-keyframes spin {
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
