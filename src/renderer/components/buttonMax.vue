<template>
    <el-button  :disabled="disabled" @click="click"
                :type="primary"
                class="iconfont icon-jianhao">
    </el-button>
</template>

<script>

    export default{
        props:{
          disabled:Boolean,
          primary:{
            default:'primary',
            type:text,
          },
        },
        methods:{
            click(){
                ipc.send('max')
            }
        }
    }
</script>

