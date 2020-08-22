<template>
  <div class="w-full h-screen">
    <upload-meter :src="img" type="audio" :perc="count" />
  </div>
</template>

<script>
import UploadMeter from "@/components/post_elements/UploadMeter.vue";
export default {
  mounted(){
    let interval = setInterval(()=>{
      if(this.count <= 1.0){
        this.count += 0.01;
      }else{
        clearInterval(interval);
      }
    },1000);
  },
  components: {
    UploadMeter
  },
  data(){
    return {
      img:"blob:http://localhost:3000/06cfb27d-3446-408f-b5c1-22d3543da98c",
      count: 0
    }
  }
}
</script>

<style>

</style>
