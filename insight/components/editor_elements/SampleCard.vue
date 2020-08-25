<template>
  <div class="w-20 h-16 mx-2 relative" @click="$emit('pick',index)">
      <div class="absolute w-full h-full z-0">
          <img v-if="this.asset.isTypeOf('image')" class="w-20 h-16" :src="asset.getSrc()" />
          <video v-else-if="this.asset.isTypeOf('video')" class="w-20 h-16" :src="asset.getSrc()" />
          <audio v-else-if="this.asset.isTypeOf('audio')" class="w-20 h-16" :src="asset.getSrc()" />
      </div>
      <div class="absolute w-full h-full z-10 bg-transparent"></div>
  </div>
</template>

<script>
export default {
    props:['asset','index'],
    mounted(){
        console.log(this.asset, this.index);
    }

}
</script>

<style>

</style>