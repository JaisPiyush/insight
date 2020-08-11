<template>
  <client-only>
    <div class="w-full h-full bg-blue-600"></div>
  </client-only>
</template>hhjh

<script>
import LoaderView from '@/components/post_elements/LoaderView.vue'
import AudioBox from '@/components/post_elements/AudioBox.vue'
import PeripheralDot from '@/components/post_elements/PeripheralDot.vue'
import VideoBox from '@/components/post_elements/VideoBox.vue';
import ImageBox from "@/components/post_elements/ImageBox.vue";
export default {
  mounted() {
    this.assets = []
    this.data.images.forEach(image => {
      this.assets.push({ type: 'image', src: image })
    })

    if (this.data.video != undefined) {
      this.assets.push({ type: 'video', src: this.data.video })
    }

    if (this.data.audio != undefined) {
      this.assets.push({ type: 'audio', src: this.data.audio })
    }

    if (this.data.text != undefined && this.data.text != {}) {
      this.assets.push({ type: 'text', src: this.data.text })
    }

    this.$nextTick().then(() => {
      if (process.client) {
        this.hammer = new Hammer.Manager(this.$el)

        let swipe = new Hammer.Swipe()

        this.hammer.add(swipe)

        this.hammer.on('swipeleft', this.slideNext)

        this.hammer.on('swiperight', this.slidePrevious)
      }
    })
  },
  components: {
    LoaderView,
    AudioBox,
    PeripheralDot,
    VideoBox,
    ImageBox
  },
  data() {
    return {
      loading: false,
      error: false,
      data: {
        images: [
          'https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg',
          'https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg',
          'https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg',
          'https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg'
        ],
        video:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        text: undefined
      },
      assets: [],
      index: 0,
      hammer: undefined
    }
  },
  methods: {
    changeloading: function(value) {
      this.loading = value
    },
    slideNext: function() {
      if (this.index < this.assets.length - 1) {
        if(this.assets[this.index].type != "video"){
          this.loading = true;
           
        }
        this.index += 1;
      }
    },
    slidePrevious: function() {
      if (this.index > 0) {
         if(this.assets[this.index].type != "video"){
          this.loading = true
          console.log(this.assets[this.index])
        }
        this.index -= 1
        // this.getAsset()
      }
    },
    fetchAsset: function(url, payload) {
      return new Promise((resolve, reject) => {
        if (payload.type != 'text') {
          el.src = payload.src
          el.onload = resolve
          el.onerror = reject
        }
      })
    },

    isActive: function(type){
      return this.assets[this.index] != undefined && this.assets[this.index].type === type;
    },
    getSrc: function(){
      if(this.assets[this.index] != undefined){
        return this.assets[this.index].src;
      }
    },
    changestate: function(payload){
      console.log('active')
      this.loading = payload.loading;
      this.error = payload.error;
    }
  }
}
</script>

<style scoped></style>
