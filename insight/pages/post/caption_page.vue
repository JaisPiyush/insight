<template>
  <div
    id="caption-page"
    class="w-full h-screen bg-blue-900 overflow-auto flex flex-col"
  >
    <!-- Header -->
    <div class="w-full h-26 flex justify-between px-4 py-4">
      <span
        @click="$router.go(-1)"
        class="material-icons stroke-current text-white"
      >
        keyboard_backspace
      </span>

    </div>
    <!-- Body -->
    <div class="w-full h-auto flex flex-col justify-between px-4 my-6">
      <div class="w-full h-auto">
        <div class="overflow-hidden w-full rounded-md bg-white flex flex-col">
          <div class="w-full h-12 p-2">
            <p class="font-lato font-semibold text-base">{{firstName}}</p>
          </div>
          <hr />
          <div id="cap-body" class="w-full h-56"></div>
          <hr />
          <div class="w-full var-height flex flex-col">
            <p class="font-montserrat font-semibold mx-2">Caption</p>
            <div id="editor" contenteditable="true" @input="keyPress" class="bg-gray-200 outline-none overflow-auto my-2 mx-2 px-1 py-1 font-muli text-sm "></div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-12 px-4 mt-6">
        <button @click="nextClick" class="w-full py-2 bg-pink-500 rounded-md font-lato font-semibold text-white">Next</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FrozenStorage from "@/static/js/local_storage.js";
export default {
  components: {},
  data() {
    return {
      caption: undefined,
      editor: undefined,
      watchIndex: undefined,
      data: undefined,
      hash: false,
      storage: undefined,
      firstName: undefined
    }
  },
  computed: {
    ...mapState('post/create', ['assets'])
  },
  updated() {
    this.editor = document.getElementById('editor')
  },
  mounted() {
    this.editor = document.getElementById('editor')
    console.log(this.assets)
    this.applyAsset();
    this.$nextTick().then(() => {
      this.storage = new FrozenStorage();
      this.firstName = this.storage.get('first_name');
      this.editor.focus();
    });
  },
  methods: {
    ...mapMutations('post/create',['insertCaption']),
    nextClick: function() {
      this.insertCaption(this.editor.innerText);
      this.$router.push('/post/uploading_data');
    },
    applyAsset: function() {
      let div = document.getElementById('cap-body')
      if (this.assets.images != undefined && this.assets.images.length > 0) {
        div.innerHTML = `<img class="w-full h-full" src="${this.assets.images[0]}" />`
      } else if (this.assets.video != undefined) {
        div.innerHTML = `<video src="${this.assets.video}" controls class="w-full h-full" />`;
      } else if (this.assets.audio != undefined) {
        div.innerHTML = `<audio src="${this.assets.audio}" controls class="w-full h-full" />`;
      }
    },
    keyPress: function() {}
  }
}
</script>

<style scoped>
.caret-purple {
  caret-color: blueviolet;
}
.var-height {
  min-height: 5rem;
  max-height: 8rem;
}
.var-height > div{
  height: 3.5rem;
  max-height: 7rem;
  caret-color: blueviolet;
}
</style>
