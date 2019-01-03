<template>
    <div>
        <div>
            <div></div>
            <div id="notic-score"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notice",
        data(){
          return{

          }
        },
        mounted(){
            this.notice_score();
        },
        methods:{
          notice_score:function () {
              option = {
                  xAxis: {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [{
                      data: [120, 200, 150, 80, 70, 110, 130],
                      type: 'bar'
                  }]
              };
          }
        },
    }
</script>

<style scoped>

</style>