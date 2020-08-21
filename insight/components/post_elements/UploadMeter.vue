<template>
 <div class="w-full h-auto flex flex-col px-4 py-4">
      <div class="w-full .padds" style="height:35vh; max-height:40vh;">
        <img v-if="this.type === 'image'" :src="src" style="width:50%;height:35vh;" />
        <img v-if="this.type === 'audio'" :src="audImg" style="width:50%;height:35vh;" />
        <video v-if="this.type === 'video'" :src="src" style="width:50%;height:35vh;" />
      </div>

      <div class="w-full flex h-10">
        <div class="mt-6 w-full h-10 rounded-lg border border-gray-300">
          <div class="bg-pink-600 h-10" :style="`width:${perc}%`"></div>
        </div>
        <div class="flex flex-col justify-center ml-4">
          <p class="font-muli font-bold text-green-400">{{percent}}</p>
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
        return percentage
      }
      return 100;
    }
  }
}
</script>

<style scoped>
.padds{
  padding-left: 25%;
}
</style>
