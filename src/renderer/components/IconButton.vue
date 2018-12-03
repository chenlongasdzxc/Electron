<template>
    <el-button icon @click="click">
        <el-icon></el-icon>
    </el-button>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
    const style = {
        min:{
            backgroundColor:'',
            right:'100px',
            icon:'el-icon-edit'
        },
        max:{
            backgroundColor: '',
            right: '60px',
            icon:'icon-blow'
        },
        close:{
            backgroundColor:'',
            right:'20px',
            icon: 'icon-close'
        },
    };
    export default {
        name:'IconBtn',
        props:['type'],
        computed:{
            style:function () {
                return style[this.type];
            }
        },
        methods:{
            click:function () {
                ipc.send(this.type);
            }
        }
    }
</script>

<style>

</style>