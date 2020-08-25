<template>
  <div class="bg-white w-full" style="height:48vh;">
      <img v-if="this.isValid('image')" class="w-full h-full" :src="asset.getSrc()" />
      <video v-else-if="this.isValid('video')" class="w-full h-full" :src="asset.getSrc()" controls />
      <audio v-else-if="this.isValid('audio')" class="w-full h-full" :src="asset.getSrc()" controls />
  </div>
</template>

<script>
export default {
    props:['asset'],
    methods:{
      isValid: function(type){
        if(this.asset != undefined && this.asset.isTypeOf(type)){
          return true;
        }
        return false;
      }
    }
}
</script>

<style>

</style>