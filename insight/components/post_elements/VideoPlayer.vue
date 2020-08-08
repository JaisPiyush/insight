<template >

<div class="player">
 
  <video id="myplayer" @timeupdate="videoTimeUpdated" :emit="['timeupdate']" ref="myplayer" v-on:click="show = !show ,playpause()">
    <source src="" type="video/mp4" >
  </video>
  <div class="play-btn" @click="show = !show;playpause()">
    <p v-if="show"> 
            <img src="">
        </p>
        <p v-else>       
    </p> 
  </div>
  <div class="vol-btn" @click="volm = !volm;muteunmute()">
    <p v-if="volm"> 
            <img src="">
        </p>
        <p v-else>
          <img src="">       
    </p> 
  </div>
  <div class="durati">{{minu1}}:{{ dura1}}</div>
</div>   
</template>

<script>
export default {
  data: function(){
                return{
                    dura1: null,
                    minu1:null,
                    show: true,
                    volm:true
                }
            },
  components: {},
  mounted() {
    this.player = this.$refs.myplayer;
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
         muteunmute: function(event){
           if (this.$refs.myplayer.muted){
             this.$refs.myplayer.muted = false;
           }
           else {
             this.$refs.myplayer.muted = true;
           }
         },
         videoTimeUpdated: function(event) {
          var curmins = Math.floor(this.player.currentTime/60);
          var cursecs = Math.floor(this.player.currentTime - curmins*60);
          var durmins = Math.floor(this.player.duration/60);
          var dursecs = Math.floor(this.player.duration - durmins*60);
          this.minu1 = durmins-curmins;
          this.dura1 = dursecs-cursecs;
    }

    }
}
</script>




<style scoped>

.player {
   cursor: pointer;
   position: relative;
   width: 450px;
}

.myplayer {
   width: 100%;
}

.play-btn {
    background:transparent;
    font-size: 50px;
    width:50px;
    height: 50px;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    text-align: center;
    border-radius: 50%;
}

.vol-btn {
    width:25px;
    height: 25px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    margin: auto;
    border-radius: 50%;
    margin-right:.5rem ;
    margin-bottom:.5rem ;

}

.durati {
    width:50px;
    height: 25px;
    position: absolute;
    right: 0px;
    top: 0px;
    margin: auto;
    border-radius: 50%;
    margin-right:0;
    margin-bottom:.5rem ;
    color: white;

}
</style>