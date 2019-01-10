<template>
    <div>
        <input class="VInput">
    </div>
</template>

<script>
    export default {
        name: "Input",
        props: {
            primary: {
                default: 'primary',
                type: String,
            }
        }
    }
</script>

<style>
    .VInput{
        border: 0 !important;
        border-bottom:  1px  solid black !important;
        border-radius: 0 !important;
        height: 30px;
    }
</style>