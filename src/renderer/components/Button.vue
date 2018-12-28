<template>
    <el-button size="small" :type="primary":disabled="disabled" @click="handleClick">
        <slot/>
    </el-button>
</template>

<script>
    export default {
        name:'ni-button',
        props:{
            disabled:Boolean,
            primary:{
                default: 'primary',
                type: String,
            },
        },
        methods:{
            handleClick(evt){
                this.$emit('click',evt);
            }
    }
    }
</script>

<style scoped>

</style>