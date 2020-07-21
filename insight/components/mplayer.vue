<template >

<div class="player bg-transparent">
 
  <audio id="myplayer" ref="myplayer" v-on:click="show = !show ,playpause()">
    <source src="@/assets/attention.mp3" type="audio/mpeg">
  </audio>
  <div @click="show = !show ,playpause()" id="btns">
    <p v-if="show"> 
            <img src="@/assets/svg/play-button.svg" width="24px" height="24px"  />
        </p>
        <p v-else>
            <img src="@/assets/svg/pause.svg" width="24px" height="24px"  />      
    </p> 
  </div>
  </div>   
</template>

<script>
export default {
    props: [
      "active",
    ],
    data: function(){
                return{
                    show: true,
                    volm:true
                }
            },
    methods: {
         playpause: function(){
           if (this.$refs.myplayer.paused){
             this.$refs.myplayer.play();
           }
           else {
             this.$refs.myplayer.pause();
           }
         },
      updated(){
        if(this.active === false){
          this.$refs.myplayer.pause();
        }
      }  
         
    }
}
</script>




<style scoped>

#btns{
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  margin: auto;
}

</style>