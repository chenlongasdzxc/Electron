<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的德育减分" align="left"></FormPanel>
                <FormPanel name="班级德育减分" align="left"></FormPanel>
            </div>
        </el-card>
    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'
    export default {
        components:{FormPanel},
        name: "MoralDeduction",
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>