<template>
  <div class="overflow-hidden">
    <client-only>
      <div
        v-if="this.texting"
        class="max-w-full w-full h-full special-black overflow-hidden"
      >
        <QuillEditor
          :active="texting"
          @cancel="texting = false"
          @deltaReceiver="textEditingFunction"
        />
      </div>
      <div
        v-if="this.textEditing"
        class="max-w-full w-full h-screen special-black overflow-hidden"
      >
        <QuillEditor
          :active="textEditing"
          @cancel="texting = false"
          @deltaReceiver="textEditingFunction"
          :text="selectedTextDiv.innerHTML"
        />
      </div>

      <div
        id="custom-editor"
        class="max-w-full w-full h-screen bg-black overflow-hidden special-black"
        v-if="!this.texting && !this.textEditing"
      >
        <!-- Header -->
        <div class="w-full h-full flex px-3 py-2 special-black">
          <ArrowBack
            @click="$router.go(-1)"
            v-if="!this.styling"
            class="w-8 h-8 fill-current bg-white rounded-md px-1"
          />
          <div class="w-full h-full flex flex-row-reverse">
            <button
              class="bg-green-600 px-4 py-2 rounded-md"
              v-if="this.totalAssets.length > 0"
              @click="next"
            >
              <span class="text-white text-lg font-muli">Next</span>
            </button>
            <img
              src="@/assets/svg/crop.svg"
              class="w-12 h-12 px-2 py-1 special-gray rounded-md mx-4"
              @click="initImageCropper()"
              v-if="
                this.mediaCardIndex != null &&
                  this.totalAssets[this.mediaCardIndex].mediaType === 'image' &&
                  !this.styling
              "
            />

            <DeleteSvg
              class="w-8 h-8 mx-4"
              v-if="this.textSelected === true"
              @click="removeText()"
            />
            <div
              v-if="this.textSelected === true"
              @click="pickerClicked('text-color-picker')"
              class="inline-block special-gray rounded-md mx-4"
            >
              <i
                class="mx-4 my-4 fa fa-paint-brush stroke-current text-white"
              ></i>
              <input
                id="text-color-picker"
                class="display-none"
                type="color"
                @change="textColorChange()"
              />
            </div>
          </div>
        </div>

        <!-- Body -->
        <div
          class="w-full h-full flex flex-col justify-center px-2 special-black"
        >
          <div 
            id="center-screen"
            class="w-full relative bg-white center-screen-height"
          >
            <div id="bg-screen" class="w-full h-full absolute"></div>
            <div id="fg-screen" class="w-full fixed z-10 top-0"></div>
          </div>
        </div>

        <!-- Media Card -->
        <div
          v-if="!this.styling && !this.texting && this.totalAssets.length > 0"
          id="media-card-counter"
          class="w-full h-full flex px-4 py-2 overflow-x-scroll overflow-y-hidden special-black"
        >
          <div v-for="asset in totalAssets" :key="totalAssets.indexOf(asset)">
            <media-card
              :index="totalAssets.indexOf(asset)"
              :currentIndex="mediaCardIndex"
              :mediaType="asset.mediaType"
              :src="asset.elem"
              @activation="clickedMediaCard"
            />
          </div>
        </div>
        <div v-else class="w-full h-full special-black "></div>

        <!-- Pickers -->
        <div
          class="w-full h-full flex justify-around pb-2"
          v-if="!this.styling && !this.texting"
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

          <!-- Song Picker -->
          <SongSvg
            id="song-picker-button"
            class="w-16 h-16 px-4 py-4 rounded-md special-gray"
            @click="pickerClicked('song-picker')"
          />
          <input
            type="file"
            accept="song/*"
            id="song-picker"
            class="display-none"
            @change="changeObserver('song-picker')"
          />

          <!-- Text Editor -->
          <!-- <TextSvg
            class="w-16 h-16 px-4 py-4 rounded-md special-gray"
            v-if="
              this.mediaCardIndex === null ||
                this.totalAssets[this.mediaCardIndex].mediaType === 'image' ||
                this.totalAssets[this.mediaCardIndex].mediaType === 'color'
            "
            @click="texting = true"
          /> -->

          <!-- Color Picker -->
          <!-- <PaintSvg
            class="w-16 h-16 px-4 py-4 rounded-md special-gray"
            id="color-picker-button"
            @click="pickerClicked('color-picker')"
          />
          <input
            type="color"
            id="color-picker"
            class="display-none"
            @change="changeObserver('color-picker')"
          /> -->
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
import PaintSvg from '@/assets/svg/PaintSvg.vue'
import RotateSvg from '@/assets/svg/RotateSvg.vue'
import SongSvg from '@/assets/svg/SongSvg.vue'
import TextSvg from '@/assets/svg/TextSvg.vue'
import CropImage from '@/static/js/ImageCanvas.js'
import QuillEditor from '@/components/QuillEditor.vue'
import EditText from '@/static/js/TextCanvas.js'
// import Canvasize from "@/static/js/Canvasie.js";
export default {
  components: {
    MediaCard,
    QuillEditor,
    VideoSvg,
    ArrowBack,
    DeleteSvg,
    ImageSvg,
    PaintSvg,
    RotateSvg,
    SongSvg,
    TextSvg
  },
  data() {
    return {
      styling: false,
      texting: false,
      activeSrc: null,
      activeMediaType: null,
      textKeywords: [],
      textSelected: false,
      selectedTextDiv: undefined,
      textEditing: false,
      revokableUrls: [],
      cropper: undefined,
      totalAssets: [],
      textAssets: {},
      assets: {
        images: [],
        video: undefined,
        song: undefined,
        colors: []
      },
      pickedType: null,
      oldNode:null,
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
    next: function() {
      let assets = {
        images: [],
        video: this.assets.video,
        song: this.assets.song,
        colors: []
      }
      let canvas
      for (var index = 0; index < this.assets.images.length; index++) {
        html2canvas(this.assets.images[index]).then(canv => {
          canvas = canv
        })
        assets.images.push(canvas)
      }
      for (var index = 0; index < this.assets.colors.length; index++) {
        html2canvas(this.assets.colors[index]).then(canv => {
          canvas = canv
        })
        assets.colors.push(canvas)
      }

      this.destruction()
    },
    destruction: function() {
      for (var i = 0; i < this.revokableUrls.length; i++) {
        window.URL.revokeObjectURL(this.revokableUrls[i])
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
      // let imageslength = this.assets.images.length
      let centerScreenId = 'center-screen'
      let centerScreen = document.getElementById(centerScreenId)
      // console.log();
      centerScreen.replaceWith(this.totalAssets[index].elem)
    },
    pickerClicked: function(elemId) {
      console.log('picker clicked')
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
        case 'song-picker':
          this.songAddition()
          break
        case 'color-picker':
          this.colorAddition()
          break
      }
      if (this.mediaCardIndex === null) {
        this.mediaCardIndex = 0
      }
      //console.log(this.assets);
      //console.log(this.totalAssets);

      this.updateScreen()
    },
    renderHtml: function(html) {
      let inner = html.repeat(1)
      let reg = /#[a-z0-9]+|@[a-z0-9]+/gi
      let match = inner.match(reg) || []
      inner = this.tagRender(inner, match)
      let elem = document.createElement('div')
      elem.innerHTML = inner
      return elem.innerHTML
    },
    textColorChange: function() {
      let colorInput = document.getElementById('text-color-picker')
      this.setTextDivStyles(this.selectedTextDiv,{
        'color':colorInput.value
      })
    },
    setTextDivStyles: function(elm, styles) {
      for (let[key,value] of Object.entries(styles)) {
        elm.style.setProperty(key, value)
      }
    },
    tagRender: function(innerHTML, match) {
      let inner = innerHTML
      for (var i = 0; i < match.length; i++) {
        if (match[i].includes('#')) {
          let cleanText = match[i]
          cleanText = cleanText.replace('#', '')
          inner = inner.replace(
            match[i],
            `<span class="font-montserrat font-semibold text-base text-blue-700">${match[i]}</span>`
          )
        } else if (match[i].includes('@')) {
          let cleanText = match[i]
          cleanText = cleanText.replace('@', '')
          inner = inner.replace(
            match[i],
            `<span class="font-montserrat font-semibold text-base text-pink-500">${match[i]}</span>`
          )
        }
      }
      return inner
    },

    removeText: function() {
      let elem = this.totalAssets[this.mediaCardIndex].elem
      let child = elem.childNodes[1]
      child.removeChild(this.selectedTextDiv)
      this.textSelected = false
    },
    textEditingFunction: function(delta) {
      this.texting = false
      this.textEditing = false
      let index = this.mediaCardIndex
      let elem
      if (this.totalAssets.length === 0) {
        let bg = document.createElement('div')
        bg.className = this.bgScreenClassList.join(' ')
        bg.className += ' bg-white'

        let fg = document.createElement('div')
        fg.className = this.fgScreenClassList.join(' ')

        elem = document.createElement('div')
        elem.id = 'center-screen'
        elem.className = this.centerScreenClassList.join(' ')
        elem.appendChild(bg)
        elem.appendChild(fg)
      } else {
        elem = this.totalAssets[index].elem
      }

      this.$nextTick(() => {
        let child = elem.childNodes[1]
        let div = delta.edited
          ? this.selectedTextDiv
          : document.createElement('div')
        div.className = 'edited-text max-h-full max-w-full px-1'
        div.innerHTML = this.renderHtml(delta.html)
        this.setTextDivStyles(div, {
          'display': 'inline-block',
          'overflow': 'hidden',
          'font-family': 'Lato',
          'font-size': '1.5rem',
          'font-weight': '600'
        })
        // this.toggleTextStyleByClass(div,['font-lato','text-2xl','font-semibold'],[]);
        let editText = new EditText(div)
        editText.tapFunction = () => {
          this.selectedTextDiv = div
          this.textSelected = true

          this.setTextDivStyles(this.selectedTextDiv, {
            'border-width':'1px',
            'border-style': 'solid',
            'border-color': '#4299e1'
          })
        }
        editText.doubleTapFunction = () => {
          console.log(div);
          this.selectedTextDiv = div
          this.textSelected = true
          this.textEditing = true
        }
        editText.activateTouch()
        div.addEventListener('click', () => {
          this.selectedTextDiv = div
          this.textSelected = true
          this.setTextDivStyles(this.selectedTextDiv, {
            'border-width':'1px',
            'border-style': 'solid',
            'border-color': '#4299e1'
          })
        })

        child.appendChild(div)
        // console.log(child);
        if (this.totalAssets.length > 0) {
          this.totalAssets[index].elem = elem
        }
        if (this.totalAssets.length > 0) {
          let tasset = this.totalAssets[index]
          if (tasset.mediaType === 'image') {
            this.assets.images[tasset['innerIndex']] = elem
          } else if (tasset.mediaType === 'color') {
            this.assets.colors[tasset.innerIndex] = elem
          }
        } else {
          this.assets.colors.push(elem)
          this.mediaCardIndex = 0
          this.totalAssets.push({
            elem: elem,
            mediaType: 'color',
            innerIndex: this.assets.colors.length - 1
          })
        }
        this.updateScreen()
      })
      // this.updateScreen();
    },
    colorAddition: function() {
      let elm = document.getElementById('color-picker')
      let centerScreenId = 'center-screen'
      let colorDiv = document.createElement('div')
      colorDiv.className = 'w-full h-full'
      colorDiv.style.background = elm.value
      colorDiv.style.width = '100%'
      colorDiv.style.height = '100%'
      // colorDiv.style.setProperty('height','20rem');

      let bgScreeDiv = document.createElement('div')
      bgScreeDiv.className = this.bgScreenClassList.join(' ')
      // bgScreeDiv.style.width = '100%';
      // bgScreeDiv.style.height = '100%';
      // bgScreeDiv.style.backgroundColor = elm.value;
      bgScreeDiv.appendChild(colorDiv)

      let fgScreenDiv = document.createElement('div')
      fgScreenDiv.className = this.fgScreenClassList.join(' ')
      // fgScreenDiv.style.width = '100%';
      // fgScreenDiv.style.height = '100%';

      let centerScreen = document.createElement('div')
      centerScreen.className = this.centerScreenClassList.join(' ')
      // centerScreen.style.backgroundColor = elm.value;
      // centerScreen.style.setProperty('height','20rem');
      centerScreen.id = centerScreenId
      // centerScreen.style.width = '100%';
      // centerScreen.style.height = '60%';
      centerScreen.appendChild(bgScreeDiv)
      centerScreen.appendChild(fgScreenDiv)
      this.assets.colors.push(centerScreen)
      this.numberMediaCard += 1
      this.totalAssets.push({
        elem: centerScreen,
        mediaType: 'color',
        innerIndex: this.assets.colors.length - 1
      })
      // this.mediaCardIndex += 1;
    },
    createMediaCard: function(index, elm) {
      // let el = document.getElementById('media-card-counter');
      // el.innerHTML = `<media-card :index="${index-1} :currentIndex="mediaCardIndex" @activation="clickedMediaCard">${elm}</media-card> `
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
      this.setTextDivStyles(videoDiv,{
        'width':'100%',
        'height':'100%',
        'max-height':'100%'
      })
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
      // centerScreen.appendChild(fgScreenDiv)
      this.assets.video = centerScreen
      this.numberMediaCard += 1
      this.totalAssets.push({ elem: centerScreen, mediaType: 'video' })
      // this.mediaCardIndex += 1;
      // this.createMediaCard(this.numberMediaCard - 1, centerScreen)
    },
    songAddition: function() {
      if (document.getElementById('song-picker').files[0] === null) {
        return null
      }
      let centerScreenId = 'center-screen'
      let songDiv = document.createElement('audio')
      songDiv.className = ['w-full', 'h-full'].join(' ')
      songDiv.setAttribute('controls', true)
      this.fileReader(
        songDiv,
        document.getElementById('song-picker').files[0]
      )

      let bgScreeDiv = document.createElement('div')
      bgScreeDiv.className = this.bgScreenClassList.join(' ')
      bgScreeDiv.appendChild(songDiv)

      let fgScreenDiv = document.createElement('div')
      fgScreenDiv.className = this.fgScreenClassList.join(' ')

      let centerScreen = document.createElement('div')
      centerScreen.className = this.centerScreenClassList.join(' ')
      centerScreen.appendChild(bgScreeDiv)
      // centerScreen.appendChild(fgScreenDiv)
      centerScreen.id = centerScreenId
      this.assets.images.push(centerScreen)
      this.numberMediaCard += 1
      this.totalAssets.push({ elem: centerScreen, mediaType: 'song' })
      // this.mediaCardIndex += 1;
      // this.createMediaCard(this.numberMediaCard - 1, centerScreen)
    },
    fileReader: function(elm, file) {
      let url = window.URL.createObjectURL(file)
      // //console.log(elm)
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
      console.log(div);
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
      console.log(div);
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
