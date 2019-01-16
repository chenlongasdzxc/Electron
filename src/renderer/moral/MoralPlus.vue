<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="新增德育加分" align="left">
                </FormPanel>
            </div>
            <div>
                <FormPanel name="班级德育加分" align="left">
                </FormPanel>
            </div>
        </el-card>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import DataTable from '../components/DataTable'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel, DataTable},
        name: "MoralPlus"
    }
</script>

<style scoped>

</style>