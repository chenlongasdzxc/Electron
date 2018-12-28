<style>
    .my-page-box{
        height: 28px;
        font-size: 14px;
        /*margin-bottom: 20px;*/
    }
    .my-page-box button i{
        margin: 0;
    }
    .my-page-box .el-select{
        display: inline-block !important;
        width: 120px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        margin-right: 14px;
    }
    .my-page-box .el-select .el-input__inner{
        height: 28px;
        line-height: 28px;
        border-radius: 1px;
    }
    .my-page-box .btn-page{
        display: inline-block;
        width:40px;
        height:28px;
        border:1px solid #dcdfe6;
        vertical-align: top;
        text-align: center;
        font-size: 14px;
        background: #fff;
        margin:0 3px;
        outline: none;
    }
    .my-page-box .btn-page:disabled{
        color: red;
        cursor: not-allowed;
        border:1px solid #dcdfe6 !important;
    }
    .my-page-box .btn-page:hover,.page-num:hover{
        border-color: #c0c4cc;
    }
    .my-page-box .btn-page:active{
        border-color: #32A350;
    }
    .my-page-box .page-num:focus{
        border-color: #32A350;
    }
    .my-page-box .btn-page .iconfont{
        line-height: 26px;
        font-size: 14px;
        color: #666;
    }
    .my-page-box .arrow-left{
        transform:rotate(180deg);
        -ms-transform:rotate(180deg); 	/* IE 9 */
        -moz-transform:rotate(180deg); 	/* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg); 	/* Opera */
    }
    .my-page-box .page-middle{
        display: inline-block;
        vertical-align: top;
        line-height: 28px;
        margin: 0 10px;
    }
    .my-page-box .page-num-box{
        display: inline-block;
        width:40px;
        height: 28px;
        line-height: 28px;
        box-sizing: border-box;
        border:1px solid #dcdfe6;
        vertical-align: top;
        text-align: center;
        font-size: 14px;
        margin: 0 4px;
    }
    .my-page-box .go-page{
        width:48px;
        height:28px;
        line-height: 28px;
        font-size: 14px;
        background:#2BA943;
        color: #fff;
        border: none;
    }
    .my-page-box .page-num{
        display: inline-block;
        width:40px;
        height: 28px;
        line-height: 28px;
        box-sizing: border-box;
        border:1px solid #dcdfe6;
        vertical-align: top;
        text-align: center;
        font-size: 14px;
        color: #2BA943;
        outline: none;
    }
    .page-right{
        float: right;
        height: 28px;
        line-height: 28px;
    }
</style>
<template>
    <div class="my-page-box">
        <el-select v-model="pageConfig.pageSize" @change="sizeChange" placeholder="显示10条">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <button @click="currentChange(1)" :disabled="pageConfig.currentPage==1"  class="btn-page arrow-left"><i class="iconfont  icon-shuangjiantouyou"></i></button>
        <button @click="prePage(-1)" :disabled="pageConfig.currentPage==1"  class="btn-page arrow-left"><i class="iconfont  icon-arrow"></i></button>
        <div class="page-middle">
            第<span class="page-num-box">{{pageConfig.currentPage}}</span>页/共{{pageConfig.totalPage}}页
        </div>
        <button @click="prePage(1)" :disabled="pageConfig.currentPage==pageConfig.totalPage"  class="btn-page"><i class="iconfont icon-arrow"></i></button>
        <button @click="currentChange(pageConfig.totalPage)" :disabled="pageConfig.currentPage==pageConfig.totalPage"  class="btn-page"><i class="iconfont icon-shuangjiantouyou"></i></button>
        <div class="page-middle">
            跳转至第
            <input class="page-num" v-model="pageConfig.goPage" type="text">
            页
            <button @click="skipPage" class="go-page" type="button">
                确定
            </button>

        </div>
        <div class="page-right">
            共{{pageConfig.total}}条数据
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                pageConfig:{
                    pageSize:10,
                    currentPage:1,
                    goPage:1,
                    totalPage:2,
                    total:0,
                },
                options: [
                    {
                        value: 10,
                        label:'显示10条'
                    }, {
                        value: 20,
                        label:'显示20条'
                    }, {
                        value: 50,
                        label:'显示50条'
                    }, {
                        value: 100,
                        label:'显示10条'
                    }, {
                        value: 200,
                        label:'显示200条'
                    }],
            }
        },
        watch:{
            total(val){
                this.initPage();
            }
        },
        props: {
            currentPage:{
                default:1
            },
            total:{
                default:0
            },
//      pageSize:{
//        default:10
//      }
        },
        mounted(){
            this.initPage();
        },
        methods:{
            initPage(){
                this.pageConfig.currentPage = this.currentPage;
                this.pageConfig.total = this.total;
                this.pageConfig.totalPage = Math.ceil(this.total/this.pageConfig.pageSize);
            },
            sizeChange(val) {
                this.$emit('sizeChange',val);
            },
            skipPage() {
                this.pageConfig.goPage =isNaN(this.pageConfig.goPage)? this.pageConfig.currentPage : parseInt(this.pageConfig.goPage);
                this.pageConfig.goPage =this.pageConfig.goPage>this.pageConfig.totalPage?this.pageConfig.totalPage:this.pageConfig.goPage;
                this.pageConfig.goPage =this.pageConfig.goPage<1?1:this.pageConfig.goPage;
                this.pageConfig.currentPage = this.pageConfig.goPage;
                this.$emit('currentChange',this.pageConfig.goPage);
            },
            currentChange(val){
                this.pageConfig.currentPage = val;
                this.pageConfig.goPage = this.pageConfig.currentPage;
                this.$emit('currentChange',val);
            },
            prePage(val){
                this.pageConfig.currentPage = parseInt(this.pageConfig.currentPage);
                val = parseInt(val);
                this.pageConfig.currentPage += val;
                this.pageConfig.goPage = this.pageConfig.currentPage;
                this.$emit('currentChange',this.pageConfig.currentPage);
            }
        }
    }
</script>
