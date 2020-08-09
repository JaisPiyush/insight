<template>
  <div class="w-full post-box bg-white my-4">
    <div class="header w-full h-full px-2 flex flex-row flex-no-wrap py-2 border border-gray-300 border-l-0 border-t-0 border-r-0">
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
        <button @click="followClickListener()" class="font-lato font-semibold text-lg text-blue-500 rounded-md h-10 px-4 bg-blue-100">
            Follow
        </button>
      </div>
    </div>


    <div class="body w-full h-full">
        <AssetSlider />
    </div>
    <div class="w-full h-full footer border border-gray-300 border-l-0 border-t-0 border-r-0"></div>
  </div>
</template>

<script>
/* TODO: Add Verified Tick */
import AssetSlider from "@/components/post_elements/AssetSlider.vue";
export default {
  components:{
      AssetSlider
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
      caption: undefined,
      love:224,
      share: 26,
      comments: 2,
      saves: 27,
      views:1027,
      saved: false
    }
  },
  methods:{
      followClickListener: function(){

      }
  }
}
</script>

<style scoped>
.post-box {
  height: 70vh;
  display: grid;
  grid-template-rows: 12% 70% 18%;
}
.body{
  height:49vh;
}

</style>
