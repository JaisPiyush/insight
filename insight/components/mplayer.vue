<template >

<div class="player">
 
  <audio id="myplayer"  ref="myplayer" v-on:click="show = !show ,playpause()">
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
        //  scrollpause: function(){
        //     for(var i = 0; i < videos.length; i++) {
        //     var video = videos[i];

        //     var x = 0,
        //         y = 0,
        //         w = video.width,
        //         h = video.height,
        //         r, //right
        //         b, //bottom 
        //         visibleX, visibleY, visible,
        //         parent;

            
        //     parent = video;
        //     while (parent && parent !== document.body) {
        //       x += parent.offsetLeft;
        //       y += parent.offsetTop;
        //       parent = parent.offsetParent;
        //     }

        //     r = x + parseInt(w);
        //     b = y + parseInt(h);
          

        //     visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
        //     visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));
            

        //     visible = visibleX * visibleY / (w * h);


        //     if (visible > fraction) {
        //       this.$refs.myplayer.play();
        //     } else {
        //       this.$refs.myplayer.pause();

        //     }
        //   }

        //  }
      udated(){
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