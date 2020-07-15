<template>
  <div id="index">
    <!-- <image-cropper :src="require(`@/assets/test/airplane.png`)" /> -->
    <!-- <canvas id="canvas" class="w-full h-40"></canvas> -->
    <client-only>
      <QuillEditor :active="true" @deltaReceiver="processDelta"/>
    </client-only>
  </div>
</template>

<script>
// import ImageCropper from '@/components/ImageCropper.vue'
import QuillEditor from '@/components/QuillEditor.vue'
// import {TextCanvas} from "@/static/js/textCanvas.js";
export default {
  components: {
    QuillEditor
  },
  data(){
    return {
      ctx: undefined,
    }
  },
  mounted(){
    // let canvas = document.getElementById('canvas');

    // this.ctx = canvas.getContext('2d');
  },
  methods:{
    processDelta:function(delta){
    }
  }
}
</script>

<style scoped></style>
