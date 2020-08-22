<template>
  <client-only>
    <div class="w-full" >
    <div v-if="this.active" class="w-full relative" style="height:50vh;">
      <div class="w-full h-full absolute z-10">
        <!-- <audio type="audio/*" controls @pause="pauseListener()" @play="playListener()" /> -->
        <audio type="audio/*" :src="audio" />
      </div>
      <div class="w-full h-full absolute z-0">
        <img loop :src="gif" />
      </div>
      <div class="absolute w-full h-full bg-transparent flex flex-col z-10">
        <div
          @click="manageAudioState()"
          class="w-full bg-transparent player-dock"
          style="height:90%;"
        >
          <div v-if="!this.playing" class="w-full h-full relative">
            <div class="child rounded-md bg-white opacity-75 px-8 pt-4 pb-4 absolute " style="top:50%;left:50%;transform: translate(-50%, -50%);">
              <i class="fa fa-play fa-lg" aria-hidden="true"></i>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: ['audio','active'],
  mounted() {
    let self = this;
    this.$nextTick().then(() => {
      self.gif = self.getGif();
      self.audioPlayer = self.$el.querySelector('audio');
      self.audioPlayer.onload = () => {
        let manager = new Hammer.Manager(self.player)
        let tap = new Hammer.Tap()
        manager.add(tap)
        manager.on('tap', self.manageAudioState);
        self.$emit('state',{laoding:false, error:false});
      }
      self.audioPlayer.onpause = () => {
        self.playing = false;
      }

      self.audioPlayer.onplay = () => {
        self.playing = true;
      }

      self.audioPlayer.onerror = (error) => {
        self.$emit('state',{laoding:false, error:true});
      }
    })
  },
  data() {
    return {
      playing: false,
      audioPlayer: undefined,
      gif:undefined,
      gifs: [
        'https://media.giphy.com/media/XMaB779YCmP9m/giphy.gif',
        'https://media.giphy.com/media/l4XfgLyXAnyzCh7vfY/giphy.gif',
        'https://media.giphy.com/media/7uBNVxDNBMqaY/giphy.gif'
      ]
    }
  },
  computed: {
  },
  methods: {
    manageAudioState: function() {
      if(this.audioPlayer.currentTime === this.audioPlayer.duration){
          this.audioPlayer.currentTime = 0;
      }
      if (this.audioPlayer.paused) {
        let audios = document.querySelectorAll('audio');
        audios.forEach((audio,i)=>{
          audio.pause();
        })
        this.audioPlayer.play()
        this.playing = true
      } else {
        this.audioPlayer.pause()
        this.playing = false
      }
    },
    randomGif: function() {
      let number = Math.random()
      let sector = 1 / this.gifs.length

      if (number <= 0) {
        return 0
      } else if (number === 1) {
        return this.gifs.length - 1
      }
      let n = parseInt((number / sector).toString())
      if (number - n >= 0.5 && n < this.gifs.length) {
        n = n + 1
      }

      return n
    },
    getGif: function() {
      let index = this.randomGif()
      let url = this.gifs[index]
      // console.log(index, url)
      return url
    },
  }
}
</script>

<style scoped>
.z-neg {
  z-index: -10;
}

audio {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>
