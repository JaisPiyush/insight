<template>
  <div id="image-cropper" class="overflow-hidden w-full h-screen max-w-full pb-10 ">
    <div class="w-full bg-white"></div>
    <div class="flex flex-col justify-center w-full overflow-hidden" id="cropper-div">
      <div id="cropper-window" class="w-full">
        <img id="croppable-img" :src="src" class="" />
      </div>
    </div>
    <div class="w-full bg-white flex justify-around">
      <button class="px-4 py-2"
      @click="$router.go(-1)"
      >
        <p class="font-lato font-bold">Cancel</p>
      </button>
      <img
        @click="rotateImage()"
        src="@/assets/svg/rotate.svg"
        class="inline-block w-6 fill-current text-white"
      />
      <button class="px-4 py-2"
      @click="cropImage()"
      >
        <p class="font-lato font-bold">Done</p>
      </button>
    </div>
  </div>
</template>

<script>
import Cropper from '@/node_modules/cropperjs/dist/cropper'
import '@/node_modules/cropperjs/dist/cropper.css'
export default {
  props: ['src'],
  mounted() {
    var image = document.getElementById('croppable-img')
    var maxAllowedHeightImage = (60 * window.innerHeight) / 100
    var marginTop = maxAllowedHeightImage - image.clientHeight
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      height: image.clientHeight,
      top: marginTop,
      left: 0,
      crop(event) {}
    })
  },
  data() {
    return {
      cropper: undefined
    }
  },
  methods: {
    rotateImage: function() {
      this.cropper.rotate(90)
    },
    cropImage: function(){
        var data = this.cropper.getCropBoxData();
        var imageData = this.cropper.getCroppedCanvas({
            height: data.height,
            width: data.width,
            imageSmoothingEnabled:true,
            imageSmoothingQuality: "medium",
        });
        this.sendImageCanvas(imageData);        
    },
    sendImageCanvas: function(data){
        /// Logic for further transfer to be defined here
    }
  }
}
</script>

<style scoped>
/* @import url('@/node_modules/dist/cropper.css'); */
#croppable-img {
  display: block;
  max-width: 100%;

  /* margin-top: 12%;
  margin-bottom: 12%; */
}

#cropper-window {
  max-height: 60%;
}


#image-cropper {
  display: grid;
  grid-template-rows: 8% 84% 8%;
}
</style>
