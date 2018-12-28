<template>
    <el-button type="text" :icon="icon" @click="handleClick" ><slot/></el-button>
</template>
<script>
    export default {
        props: {
            icon: {
                type: String,
                default: ''
            },
        },
        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        }
    }
</script>