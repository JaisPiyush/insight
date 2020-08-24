<template>
  <div class="overflow-hidden">
    <client-only>
      <div
        id="custom-editor"
        class="max-w-full w-full h-screen bg-black overflow-hidden special-black"
      >
        <!-- Header -->
        <div class="w-full h-full flex px-3 py-2 special-black">
          <span
            @click="$router.go(-1)"
            class="material-icons stroke-current text-white"
          >
            keyboard_backspace
          </span>
          <div class="w-full h-full flex flex-row-reverse">
            <button
              class="bg-green-600 px-4 py-2 rounded-md"
              v-if="this.totalAssets.length > 0"
              @click="nextClick"
            >
              <span class="text-white text-lg font-muli">Next</span>
            </button>
            <img
              src="@/assets/svg/crop.svg"
              class="w-12 h-12 px-2 py-1 special-gray rounded-md mx-4"
              @click="initImageCropper()"
              v-if="
                this.mediaCardIndex != null &&
                  this.totalAssets.length > 0 &&
                  this.totalAssets[this.mediaCardIndex].mediaType === 'image' &&
                  !this.styling && false
              "
            />

            <DeleteSvg
              class="w-8 h-8 mx-4 my-2"
              v-if="this.mediaCardIndex != null"
              @click="removeMedia()"
            />
          </div>
        </div>

        <!-- Body -->
        <div
          class="w-full h-full flex flex-col justify-center px-2 special-black bg-no-repeat"
        >
          <div
            id="center-screen"
            class="w-full relative bg-white center-screen"
          >
            <div id="bg-screen" class="w-full h-full absolute"></div>
            <div id="fg-screen" class="w-full fixed z-10 top-0"></div>
          </div>
        </div>

        <!-- Media Card -->
        <div
          v-if="!this.styling && this.totalAssets.length > 0"
          id="media-card-counter"
          class="w-full h-full flex px-4 py-2 overflow-x-scroll overflow-y-hidden special-black"
        >
          <div v-for="asset in totalAssets" :key="totalAssets.indexOf(asset)">
            <media-card
              :index="totalAssets.indexOf(asset)"
              :currentIndex="mediaCardIndex"
              :mediaType="asset.mediaType || undefined"
              :src="asset.elem || undefined"
              @activation="clickedMediaCard"
            />
          </div>
        </div>
        <div v-else class="w-full h-full special-black "></div>

        <!-- Pickers -->
        <div
          class="w-full h-full flex justify-around pb-2"
          v-if="!this.styling"
        >
          <!-- Image Picker -->
          <ImageSvg
            id="image-picker-button"
            class="w-16 h-16 px-4 py-4 rounded-md special-gray"
            @click="pickerClicked('image-picker')"
          />
          <input
            type="file"
            accept="image/*"
            id="image-picker"
            class="display-none"
            multiple="multiple"
            @change="changeObserver('image-picker')"
          />

          <VideoSvg
            id="video-picker-button"
            class="w-16 h-16 px-4 py-4 rounded-md special-gray"
            @click="pickerClicked('video-picker')"
          />
          <input
            type="file"
            accept="video/*"
            id="video-picker"
            class="display-none"
            @change="changeObserver('video-picker')"
          />

          <!-- audio Picker -->
          <audioSvg
            id="audio-picker-button"
            class="w-16 h-16 px-4 py-4 rounded-md special-gray"
            @click="pickerClicked('audio-picker')"
          />
          <input
            type="file"
            accept="audio/*"
            id="audio-picker"
            class="display-none"
            @change="changeObserver('audio-picker')"
          />
        </div>

        <!-- Cropper Widgets -->
        <div
          v-else-if="this.styling"
          class="w-full h-full flex justify-around py-0 special-black"
        >
          <button
            class="px-4 h-12 special-gray rounded-lg text-white"
            @click="destroyCropper()"
          >
            <p class="font-lato font-bold">Cancel</p>
          </button>
          <RotateSvg
            @click="rotateImage()"
            class="stroke-current rounded-md text-white w-16 h-16 px-4 py-4 bg-white"
          />
          <button
            class="px-4 h-12 special-pink rounded-lg text-white"
            @click="cropImage()"
          >
            <p class="font-lato font-bold">Done</p>
          </button>
        </div>
        <!-- Cropper Widgets Ends Here -->
      </div>
    </client-only>
  </div>
</template>

<script>
// import EditedText from '@/components/editor_elements/EditedText.vue'
import MediaCard from '@/components/editor_elements/MediaCard.vue'
import VideoSvg from '@/assets/svg/VideoSvg.vue'
import ArrowBack from '@/assets/svg/ArrowBack.vue'
import DeleteSvg from '@/assets/svg/DeleteSvg.vue'
import ImageSvg from '@/assets/svg/ImageSvg.vue'
import RotateSvg from '@/assets/svg/RotateSvg.vue'
import audioSvg from '@/assets/svg/audioSvg.vue'
import CropImage from '@/static/js/ImageCanvas.js'
import '@/node_modules/cropperjs/dist/cropper.css'
import { mapMutations } from 'vuex'
// import Canvasize from "@/static/js/Canvasie.js";
export default {
  components: {
    MediaCard,
    VideoSvg,
    ArrowBack,
    DeleteSvg,
    ImageSvg,
    RotateSvg,
    audioSvg
  },
  data() {
    return {
      styling: false,
      activeSrc: null,
      activeMediaType: null,
      textKeywords: [],
      revokableUrls: [],
      cropper: undefined,
      totalAssets: [],
      basicNode: `<div id="center-screen" class="w-full relative bg-white center-screen" style="width:25rem;">
            <div id="bg-screen" class="w-full h-full absolute"></div>
            <div id="fg-screen" class="w-full fixed z-10 top-0"></div>
          </div>`,
      assets: {
        images: [],
        video: undefined,
        audio: undefined,
        colors: []
      },
      pickedType: null,
      numberMediaCard: 0,
      mediaCardIndex: null,
      bgScreenClassList: ['w-full', 'h-full', 'absolute', 'z-0'],
      centerScreenClassList: ['w-full', 'bg-white', 'relative', 'h-64'],
      fgScreenClassList: ['w-full', 'h-full', 'absolute', 'z-10', 'top-0'],
      fontClasses: ['font-lato', 'font-muli', 'font-montserrat', 'font-roboto'],
      fontSizes: ['text-xl', 'text-2xl', 'text-3xl', 'text-4xl']
    }
  },
  methods: {
    ...mapMutations('post/create', ['insertAssets']),
    nextClick: function() {
      if (
        this.assets.images.length > 0 ||
        this.assets.video != undefined ||
        this.assets.audio != undefined
      ) {
        console.log(this.assets)
        if (this.assets.images.length > 0) {
          let images = []
          this.assets.images.forEach(el => {
            let img = el.querySelector('img')
            // console.log(img.src);
            images.push(img.src)
          })
          this.insertAssets({ images: images, editor: 'custom_editor' });
        }
        if (this.assets.video != undefined) {
          let video = this.$el.querySelector('video')
          this.insertAssets({ video: video.src, editor: 'custom_editor'});
        }
        if (this.assets.audio != undefined) {
          let audio = this.$el.querySelector('audio');
          console.log(audio)
          this.insertAssets({ audio: audio.src, editor: 'custom_editor' });
        }

        this.$router.push('/post/caption_page')
      }
    },
    removeMedia: function() {
      let elem = this.totalAssets[this.mediaCardIndex]
      this.totalAssets = this.totalAssets.filter(
        el => this.totalAssets.indexOf(el) != this.mediaCardIndex
      )
      if (this.totalAssets.length == 0) {
        this.totalAssets = []
      }
      // console.log(this.totalAssets);
      if (elem.mediaType === 'image') {
        // console.log(this.assets.images.length, elem.innerIndex)
        if (this.assets.images.length == 1) {
          this.assets.images = []
        } else {
          this.assets.images = this.assets.images
            .slice(0, elem.innerIndex)
            .concat(
              this.assets.images.slice(
                elem.innerIndex + 1,
                this.assets.images.length
              )
            )
        }
        // console.log(this.assets.images)
      } else if (elem.mediaType === 'video') {
        this.assets.video = undefined
      } else if (elem.mediaType === 'audio') {
        this.assets.audio = undefined
      }
      if (this.totalAssets.length === 0) {
        let div = document.getElementById('center-screen')
        div.outerHTML = this.basicNode
        this.mediaCardIndex = null
      } else {
      }
    },

    clickedMediaCard: function(payload) {
      this.mediaCardIndex = payload.index
      this.activeSrc = payload.src
      this.activeMediaType = payload.mediaType
      this.updateScreen()
    },

    updateScreen: function() {
      let index = this.mediaCardIndex
      let centerScreenId = 'center-screen'
      let centerScreen = document.getElementById(centerScreenId)
      centerScreen.replaceWith(this.totalAssets[index].elem)
    },

    pickerClicked: function(elemId) {
      let elem = document.getElementById(elemId)
      elem.click()
      this.pickedType = elemId
    },

    changeObserver: function(type) {
      switch (type) {
        case 'image-picker':
          this.imageAddition()
          break
        case 'video-picker':
          this.videoAddition()
          break
        case 'audio-picker':
          this.audioAddition()
          break
      }
      if (this.mediaCardIndex === null) {
        this.mediaCardIndex = 0
      }

      this.updateScreen()
    },

    imageAddition: function() {
      let elm = document.getElementById('image-picker')
      let centerScreenId = 'center-screen'
      for (var i = 0; i < elm.files.length; i++) {
        let imageDiv = document.createElement('img')
        imageDiv.className = ['w-full', 'h-full'].join(' ')
        this.fileReader(imageDiv, elm.files[i])

        let bgScreeDiv = document.createElement('div')
        bgScreeDiv.className = this.bgScreenClassList.join(' ')
        bgScreeDiv.appendChild(imageDiv)

        let fgScreenDiv = document.createElement('div')
        fgScreenDiv.className = this.fgScreenClassList.join(' ')

        let centerScreen = document.createElement('div')
        centerScreen.className = this.centerScreenClassList.join(' ')
        centerScreen.id = centerScreenId
        centerScreen.appendChild(bgScreeDiv)
        centerScreen.appendChild(fgScreenDiv)
        this.assets.images.push(centerScreen)
        this.numberMediaCard += 1
        this.totalAssets.push({
          elem: centerScreen,
          mediaType: 'image',
          innerIndex: this.assets.images.length - 1
        })
        // this.mediaCardIndex += 1;
      }
    },
    videoAddition: function() {
      if (document.getElementById('video-picker').files[0] === null) {
        return null
      }
      let centerScreenId = 'center-screen'
      let videoDiv = document.createElement('video')
      videoDiv.setAttribute('controls', true)
      this.fileReader(
        videoDiv,
        document.getElementById('video-picker').files[0]
      )

      let bgScreeDiv = document.createElement('div')
      bgScreeDiv.className = this.bgScreenClassList.join(' ')
      bgScreeDiv.appendChild(videoDiv)

      let fgScreenDiv = document.createElement('div')
      fgScreenDiv.className = this.fgScreenClassList.join(' ')

      let centerScreen = document.createElement('div')
      centerScreen.className = this.centerScreenClassList.join(' ')
      centerScreen.id = centerScreenId
      centerScreen.appendChild(bgScreeDiv)
      if(this.assets.video != undefined){
        this.totalAssets = this.totalAssets.filter(el => el.mediaType != "video");
      }
      this.assets.video = centerScreen;
      this.numberMediaCard = this.totalAssets.length;
      this.totalAssets.push({ elem: centerScreen, mediaType: 'video' })
      // this.mediaCardIndex += 1;
      // this.createMediaCard(this.numberMediaCard - 1, centerScreen)
    },
    audioAddition: function() {
      if (document.getElementById('audio-picker').files[0] === null) {
        return null
      }
      let centerScreenId = 'center-screen'
      let audioDiv = document.createElement('audio')
      audioDiv.className = ['w-full', 'h-full'].join(' ')
      audioDiv.setAttribute('controls', true)
      this.fileReader(
        audioDiv,
        document.getElementById('audio-picker').files[0]
      )

      let bgScreeDiv = document.createElement('div')
      bgScreeDiv.className = this.bgScreenClassList.join(' ')
      bgScreeDiv.appendChild(audioDiv)

      let fgScreenDiv = document.createElement('div')
      fgScreenDiv.className = this.fgScreenClassList.join(' ')

      let centerScreen = document.createElement('div')
      centerScreen.className = this.centerScreenClassList.join(' ')
      centerScreen.appendChild(bgScreeDiv)
      // centerScreen.appendChild(fgScreenDiv)
      centerScreen.id = centerScreenId

      if(this.assets.audio != undefined){
        this.totalAssets = this.totalAssets.filter(el => el.mediaType != "audio");
      }
      this.assets.audio = centerScreen;
      this.numberMediaCard = this.totalAssets.length;
      this.totalAssets.push({ elem: centerScreen, mediaType: 'audio' })
      // this.mediaCardIndex += 1;
      // this.createMediaCard(this.numberMediaCard - 1, centerScreen)
    },
    fileReader: function(elm, file) {
      let url = window.URL.createObjectURL(file);
      elm.src = url
      this.revokableUrls.push(url)
      elm.onload = function() {
        console.log(elm.src)
      }
    },

    initImageCropper: function() {
      this.styling = true
      let index = this.totalAssets[this.mediaCardIndex].innerIndex
      let elem = this.assets.images[index]
      // console.log(index,elem,this.totalAssets);
      this.oldNode = elem.childNodes[1]
      // console.log(oldNode);
      elem.removeChild(this.oldNode)
      elem = elem.querySelector('img')
      //console.log(elem);
      this.cropper = new CropImage(elem)
      this.cropper.$init()
    },
    rotateImage: function() {
      this.cropper.rotate()
    },
    destroyCropper: function() {
      let index = this.totalAssets[this.mediaCardIndex].innerIndex
      let div = this.assets.images[index]
      console.log(div)
      div.appendChild(this.oldNode)
      this.cropper.destroy()
      this.cropper = undefined
      this.styling = false
    },
    cropImage: function() {
      let imageUrl = this.cropper.cropImage()
      let index = this.totalAssets[this.mediaCardIndex].innerIndex
      let div = this.assets.images[index]
      //console.log(div);
      let img = div.querySelector('img')
      img.src = imageUrl
      this.assets.images[index] = div
      this.revokableUrls[index] = imageUrl
      let centerScreen = document.getElementById('center-screen')
      centerScreen.replaceWith(div)
      // console.log(centerScreen);
      this.destroyCropper()
    }
  }
}
</script>

<style scoped>
/* @import url('@/node_modules/quill/dist/quill.snow.css'); */

#custom-editor {
  display: grid;
  grid-template-rows: 7.7% 60% 15.6% 16.7%;
}

#center-screen {
  height: 25rem;
  border-radius: 1rem;
}

.center-screen {
  height: 25rem;
  border-radius: 1rem;
}
.display-none {
  display: none;
}

.special-black {
  background-color: #070607;
}
.special-gray {
  background-color: #26252c;
}
svg:active {
  background-color: #eb455e;
}

.special-pink {
  background-color: #eb455e;
}
</style>
