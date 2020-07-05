<template>
  <div id="app" v-hammer:tap="togglePlayState()">
   <!-- <header>
      <h1>My Music</h1>
    </header>
    <main>
      <section class="player">
        <div class="controls">
         
          <button class="play" v-if="!isPlaying" @click="play">Play</button>
          <button class="pause" v-else @click="pause">Pause</button>
        </div>
      </section>
    </main> -->
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data () {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      songs: [
        {
          src: require('./assets/rockstar.mp3')
        },
      ],
      player: new Audio()
    }
  },
  methods: {
    tooglePlayState: function(){
      // Will revert the current state of isPlaying and
      // trigger is play if isPlaying is true and pause if isPlaying is false
      this.isPlaying = ! this.isPlaying;
      if(this.isPlaying){
      this.play(this.songs);
      }else{
      this.pause();
      }
    },
    play (song) {
      if (typeof song.src != "undefined") {
        this.current = song;
        this.player.src = this.current.src;
      }
      this.player.play();
      this.player.addEventListener('ended', function () {
        this.index++;
        if (this.index > this.songs.length - 1) {
          this.index = 0;
        }
        this.current = this.songs[this.index];
        this.play(this.current);
      }.bind(this));
      this.isPlaying = true;
    },
    pause () {
      this.player.pause();
      this.isPlaying = false;
    },
  },
  created () {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  }
}
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	font-family: sans-serif;
}
header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
	background-color: #212121;
	color: #FFF;
}
main {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 25px;
}


.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
}
button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
.play, .pause {
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  margin: 0px 15px;
  border-radius: 8px;
  color: #FFF;
  background-color: #CC2E5D;
}


.playlist .song.playing {
  color: #FFF;
  background-image: linear-gradient(to right, #CC2E5D, #FF5858);
}
</style>
