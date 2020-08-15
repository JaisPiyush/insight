<template>
  <div class="h-auto px-2 py-2 my-6 ml-2 flex bg-black rounded-lg" style="width:80%;">
      <div class="w-12 h-full inline-block text-center">
          <img :src="data.avatar" class="w-10 h-10 rounded-md" style="" />
      </div>
      <div class="w-full h-full flex flex-col ml-4">
          <p class="font-lato font-semibold text-white text-sm word">{{data.username}}</p>
          <p class="font-muli font-light text-white text-sm word" v-html="comment"></p>
      </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  mounted() {
      this.formatComment();
  },
  data() {
    return {
      comment: undefined
    }
  },
  methods: {
    formatComment: function() {
      let regex = /@[0-9a-z_?]+|#[0-9a-z_?]+/gi;
      this.comment = this.data.data;
      let matches = this.data.data.match(regex) || []
      if (matches.length > 0) {
        for (let index = 0; index < matches.length; index++) {
          if (matches[index].includes('#')) {
            this.comment = this.data.data.replace(
              matches[index],
              `<span class="font-montserrat italic text-blue-500">${matches[index]}</span>`
            )
          } else if (matches[index].includes('@')) {
            this.comment = this.data.data.replace(
              matches[index],
              `<span class="font-montserrat text-blue-700">${matches[index]}</span>`
            )
          }
        }
      }
    //   console.log(this.comment,matches)
    }
  }
}
</script>


<style scoped>
.word {
  word-wrap: break-word;
  overflow: hidden;
}

.special-gray {
  background-color: #26252c;
}
</style>