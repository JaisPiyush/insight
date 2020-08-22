<template>
 <div class="w-full h-auto flex flex-col px-2">
      <div class="w-full flex justify-center mt-12" style="height:35vh; max-height:40vh;">
        <img v-if="this.type === 'image'" :src="src" style="width:50%;height:25vh;" />
        <img v-if="this.type === 'audio'" :src="audImg" style="width:50%;height:25vh;" />
        <video v-if="this.type === 'video'" :src="src" style="width:50%;height:25vh;" />
      </div>

      <div class="w-full flex h-10">
        <div class=" w-full h-10 rounded-lg border border-gray-300">
          <div class="bg-pink-600 h-10 rounded-lg" :style="`width:${percent}%`"></div>
        </div>
        <div class="h-full ml-2">
          <p class="font-muli mt-1 font-bold text-green-400">{{percent}}%</p>
        </div>
      </div>
 </div>
</template>

<script>
export default{
  props:['src','type','perc'],
  data(){
    return {
      audImg: 'https://firebasestorage.googleapis.com/v0/b/social-express-103904.appspot.com/o/assets%2Flogo.jpeg?alt=media&token=ac16b5c8-42aa-45a2-ae29-05809fba116f'
    }
  },
  computed:{
    percent: function(){
      if(this.perc === NaN){
        return 100;
      }
      let percentage = this.perc * 100;
      if(percentage < 100){
        return percentage.toFixed(0)
      }
      return 100;
    }
  }
}
</script>

<style scoped>
.padds{
  padding: auto ;
}
</style>
