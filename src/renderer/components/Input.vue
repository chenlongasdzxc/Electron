<template>
    <div>
        <input class="VInput">
    </div>
</template>

<script>
    export default {
        name: "Input",
        props: {
            type: {
                type: String,
                default: 'text'
            },
        }
    }
</script>

<style>
    .VInput{
        border: 0 !important;
        border-bottom:  2px  solid darkgrey !important;
        border-radius: 0 !important;
        height: 30px;
        outline: none;
        line-height: 0px;
        color: black;
        min-width: 150px;
    }
</style>