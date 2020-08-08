<template>
  <div class="w-full h-screen overflow-hidden flex flex-col pt-6">
      <div class="w-full h-10 flex justify-center">
          <p class="font-muli font-bold text-xl text-gray-900">Uploading Files</p>
      </div>
      <div id="parent-canvas" class="w-full  flex flex-col justify-center align-middle relative">
          <canvas id="loading-canvas" class="w-full h-56 absolute z-0" />
          <div class="w-full h-56 z-10 flex flex-col justify-center align-middle">
              <div class="avatar" id="avatar"></div>
          </div>
      </div>
      <!-- <div class="w-full h-auto py-2 px-2 overflow-y-scroll flex flex-col">
          <div v-for=""></div>
      </div> -->
  </div>    
</template>

<script>
import {mapState, mapActions} from "vuex";
export default {
    data(){
        return {
            canvas: undefined,
            context: undefined,
            loadAngle:0
        }
    },
    computed:{
        ...mapState("post/create", ['current', 'progress','assets'])
    },
    mounted(){
       
        this.$nextTick().then(() => {
          this.canvas = document.getElementById('loading-canvas');
          this.context = this.canvas.getContext('2d');
          this.uploadFilesToFirebase();
          this.attachAsset();
          this.animate();
        });
    },
    methods:{
         ...mapActions("post/create", ['uploadFilesToFirebase']),
        draw: function(){
            let boundries = this.canvas.getBoundingClientRect();
            let x = boundries.width/2;
            let y = boundries.height / 2;
            let radius = 50
            this.context.clearRect(0,0, x*2, y*2);
            this.context.beginPath();
            this.context.arc(x-radius,y-radius,radius,0,Math.PI*this.loadAngle,false);
            this.context.strokeStyle = "#ed64a6";
            this.context.lineWidth = 8;
            this.context.stroke();
        },
        animate: function(){
            window.requestAnimationFrame(() => {
                let factor = 0.02;
                this.loadAngle = factor * this.progress;
                this.draw();
            });
        },
        attachAsset: function(){
            let avatar = document.getElementById('avatar');
            if(this.current.type === "image"){
                avatar.innerHTML = `<img src="${this.assets.images[this.current.index]}" class="w-full h-full />`;
            }else if(this.current.type === "video"){
                avatar.innerHTML = `<video src="${this.assets.video}" class="w-full h-full"/>`;
            }else if(this.current.type === "audio"){
                avatar.innerHTML = `<audio src="${this.assets.audio}" class="w-full h-full" />`
            }
        }
    }
}
</script>

<style scoped>
#parent-canvas{
    height: 45vh;
}

.avatar{
    height: 8.75rem;
    width: 8.125rem;
    margin-left:9.375rem;
    margin-top: -2.375rem;
    border-radius: 50%;
    /* background-color: blue; */
}
</style>