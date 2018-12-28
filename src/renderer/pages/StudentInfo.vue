<template>
    <div>
        <div>
        success
        </div>
        <div>
            <VButton @click="backToMenu">Back</VButton>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    export default {
        components:{VButton},
        name: "StudentInfo",

        methods:{
            backToMenu:function () {
                this.$router.push({path:'/Menu'})
            }
        }
    }
</script>

<style scoped>

</style>