<template>
    <div>
        <el-input placeholder="请输入要查找的温度值" prefix-icon="el-icon-search" v-model="value">
        </el-input>
        <el-button style="margin-left:40%;" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button style="" type="primary" icon="el-icon-search" @click="searchAll">搜索所有数据</el-button>
        <div class="box">
            <table>
                <thead>
                    <tr>
                        <td><el-checkbox  v-model="checkAll" @change="allChange">全选</el-checkbox></td>
                        <td>编号</td>
                        <td>时刻</td>
                        <td>温度</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-show="data==null||data.length==0"><td colspan="5">没有你所要查询的数据</td></tr>
                    <tr v-for="(d,i) of data" :key="i">
                        <td><el-checkbox  v-model="checked[i]"></el-checkbox></td>
                        <td>{{d.t_id}}</td>
                        <td>{{d.t_times | formatDate}}</td>
                        <td>{{d.t_temperature}}</td>
                        <td><el-button class="del" type="primary" icon="el-icon-delete" @click="del(d.t_id)"></el-button></td>
                    </tr>
                    <tr  v-show="data!=null"><td colspan="5"><el-button class="del" type="primary" icon="el-icon-delete" @click="dels"></el-button></td></tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            value:"",
            data:[],
            checkAll: false,
            checked:[]
        }
    },
    filters:{
        formatDate: (value)=>{
            let date = new Date(parseInt(value));
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      }
    },
    watch: {
        checked(){
            console.log()
            if(this.checked.length==this.data.length){
                for(var i in this.checked){
                    if(this.checked[i]==true){
                        this.checkAll=true;
                    }else{
                        this.checkAll=false;
                    }  
                }
            }     
        }
    },
    methods: {
        search(){
            var url="/temp";
            this.axios.get(url, { params: {temp:this.value} }).then(result => {
                console.log(result.data)
                this.data=result.data
            })
        },
        searchAll(){
            var url="/tempAll";
            this.axios.get(url).then(result => {
                //console.log(result.data)
                this.data=result.data
                this.value=""
            })
        },
        allChange(){
            this.checked=[]
            if(this.checkAll==true){
                for(var i in this.data){
                    this.checked.push(true)
                }
            }else{
                for(var i in this.data){
                    this.checked.push(false)
                }
            }
            console.log(this.checked)
        },
        del(i){
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url="/del";
                this.axios.get(url,{ params: {id:i} }).then(result => {
                    console.log(result)
                    //this.data=result.data
                    if(this.value==""){
                        this.searchAll()
                    }else{
                        this.search()
                    }
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        dels(){
            this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url="/dels";
                this.axios.get(url,{ params: {} }).then(result => {
                    console.log(result)
                    //this.data=result.data
                    if(this.value==""){
                        this.searchAll()
                    }else{
                        this.search()
                    }
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    },
    created() {
        this.searchAll()
    },
    updated() {
        
    },
}
</script>
<style scoped>
    .el-input{
        width:500px !important;
        left:40%;
        margin-left: -250px;
        margin-top: 10px;
    }
    .box{
        color:#0ff;
        margin:20px;
        padding:20px;
    }
    table{
        margin: 0 auto;
        width: 500px;
        border:1px solid #0ff;
    }
    table thead td{
       font-weight:bold;
    }
    table td{
         border:1px solid #0ff;
         text-align: center
    }
    .del{
        margin:5px;
        padding: 6px 20px
        
    }
</style>
