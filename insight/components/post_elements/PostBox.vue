<template>
  <div class="w-full post-box bg-white my-4 overflow-hidden" style="border-bottom-right-radius: 1.25rem;border-bottom-left-radius: 1.25rem;">
    <div
      class="header w-full h-16 px-2 flex flex-row flex-no-wrap py-2 border border-gray-300 border-l-0 border-t-0 border-r-0"
    >
      <img :src="avatar" class="w-12 h-12 rounded-lg" />

      <div class="w-auto h-full flex flex-col  ml-4">
        <p class="block font-lato font-bold text-black text-base">
          {{ username }}
        </p>
        <p class="font-lato font-light text-gray-700 text-sm">
          {{ hobbyName }}
        </p>
      </div>
      <div class="w-full h-full flex flex-row-reverse px-2">
        <button
          @click="followClickListener()"
          class="font-lato font-semibold text-lg text-blue-500 rounded-md h-10 px-4 bg-blue-100"
        >
          Follow
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="body w-full bg-blue-600">
      <AssetSlider />
    </div>

    <!-- Footer -->
    <div
      class="w-full h-auto flex flex-col footer"
    >
      <!-- truncated Caption -->
      <div
        v-if="this.caption != undefined && !this.fullCaption"
        class="w-full h-auto py-1 px-2 py-2 flex"
      >
        <div class="h-full" style="width:73%;">
          <div class="w-full truncate font-muli font-medium text-base" v-html="caption">
          </div>
        </div>
        <button
          @click="showFullCaption()"
          class="px-4 bg-transparent outline-none border-0 text-gray-500 text-sm"
        >
          Read More
        </button>
      </div>

      <!-- Actions -->
      <div class="w-full h-16 flex overflow-hidden">
        <div class="w-full h-auto flex px-2 py-2">
          <button class="w-auto h-auto py-0 px-4">
            <i class="fa fa-heart-o stroke-current text-red-600 fa-lg"></i>
            <span
              class="ml-1 font-muli font-medium text-red-600 text-gray-800 text-sm"
              >{{ loves }}</span
            >
          </button>
          <button class="w-auto ml-1 h-auto py-0 px-4">
            <i
              class="fa fa-dot-circle-o stroke-current text-purple-700 fa-lg"
            ></i>
            <span
              class="ml-1 font-muli font-medium text-purple-600 text-gray-800 text-sm"
              >{{ views }}</span
            >
          </button>

          <button class="w-auto ml-1 h-auto py-0 px-4">
            <i class="fa fa-share stroke-current text-blue-700 fa-lg"></i>
            <span
              class="ml-1 font-muli font-medium text-blue-700 text-gray-800 text-sm"
              >{{ shares }}</span
            >
          </button>

          <button class="ml-1 px-4 w-auto h-auto py-2">
            <i
              v-if="this.saved"
              class="fa fa-bookmark fa-2x"
              aria-hidden="true"
            ></i>
            <i v-else class="fa fa-bookmark-o fa-2x" aria-hidden="true"></i>
          </button>
        </div>
        <button @click="$emit('enable-comment')" class="w-auto h-12 pt-2 px-2 outline-none bg-black rounded-lg mt-2 mr-2">
          <span class="material-icons text-3xl stroke-current text-white">
            comment
          </span>
        </button>
      </div>

      <!-- Full Caption -->
      <div
        v-if="this.caption != undefined && this.fullCaption"
        class="w-full h-auto py-2 px-4 flex flex-col"
      >
        <div class="w-full h-auto word">
          <p class="word font-muli font-medium text-base" v-html="caption"></p>
        </div>
        <div class="w-full h-auto">
          <button @click="truncateCaption()" class="text-base text-gray-600">Show Less</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* TODO: Add Verified Tick */
import AssetSlider from '@/components/post_elements/AssetSlider.vue'
export default {
  props: ['commentActive'],
  components: {
    AssetSlider
  },
  mounted(){
    this.getCaption();
  },
  data() {
    return {
      avatar:
        'https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg',
      username: 'jarden103',
      hobbyName: 'Photography',
      assets: {
        images: [],
        video: undefined,
        audio: undefined,
        text: {}
      },
      caption:
        'Hello world, this is going to work better. Hello good bo #fuck @you.',
      loves: 224,
      shares: 26,
      comments: 2,
      saves: 27,
      views: 1027,
      saved: false,
      fullCaption: false
    }
  },
  methods: {
    getCaption: function() {
      let regex = /@[0-9a-z_?]+|#[0-9a-z_?]+/gi
      let matches = this.caption.match(regex) || []
      if (matches.length > 0) {
        for (let index = 0; index < matches.length; index++) {
          if (matches[index].includes('#')) {
            this.caption = this.caption.replace(
              matches[index],
              `<span class="font-montserrat italic text-blue-500">${matches[index]}</span>`
            )
          } else if (matches[index].includes('@')) {
            this.caption =this.caption.replace(
              matches[index],
              `<span class="font-montserrat text-blue-700">${matches[index]}</span>`
            )
          }
        }
      }
    },
    followClickListener: function() {},
    showFullCaption: function() {
      this.fullCaption = true;
    },
    truncateCaption: function(){
      this.fullCaption = false;
    }
  }
}
</script>

<style scoped>
.post-box {
  height: auto;
  display: flex;
  flex-flow: column;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.body {
  max-height: 52vh;
  min-height: 40vh;
}

.word {
  word-wrap: break-word;
  overflow: hidden;
}
</style>
