<template>
  <div
    class="w-full h-full py-2 px-2 overflow-hidden "
  >
    <p class="wrap-text text-lg" style="height:48vh; width:100%; overflow-y:scroll;touch-action: pan-y !important;" v-html="text"></p>
  </div>
</template>

<script>
export default {
  props: ['data','media'],
  data(){
    return {
      text: undefined
    }
  },
  mounted(){
      let self = this;
      
      this.getText();
      // this.spltiContent();
      this.$nextTick().then(() => {
         let elem = self.$el.querySelector('p');
         if(self.data.bgColor != undefined){
            self.$el.style.setProperty('background-color',self.data.bgColor);
         }
         if(self.data.fontColor != undefined){
           self.$el.style.setProperty('color',self.data.fontColor);
         }
        if(self.data.fontName != undefined){
          self.$el.style.setProperty('font-family',self.data.fontName);
        }
      })
  },
  methods:{
   getImage: function(){
     if(this.media != undefined && this.media.type === "image"){
       return `<div class="w-full mb-2 " style="min-height:30vh; max-height:35vh;">
                  <img class="w-full h-full rounded-lg" src="${this.media.src}" />
               </div>`;
     }
   },
   getVideo: function(){
     if(this.media != undefined && this.media.type === "video"){
       return `<div class="w-full mb-2 " style="min-height:30vh; max-height:35vh;">
                  <video controls class="w-full h-full rounded-lg" src="${this.media.src}" />
               </div>`;
     }
   },
    getText: function(){
      this.text = this.data.text;
      let regex = /@[0-9a-z_?]+|#[0-9a-z_?]+/gi
      let matches = this.data.text.match(regex) || []
      if (matches.length > 0) {
        for (let index = 0; index < matches.length; index++) {
          if (matches[index].includes('#')) {
            this.text = this.data.text.replace(
              matches[index],
              `<span class="font-montserrat italic text-blue-500">${matches[index]}</span>`
            )
          } else if (matches[index].includes('@')) {
            this.text =this.data.text.replace(
              matches[index],
              `<span class="font-montserrat text-blue-700">${matches[index]}</span>`
            )
          }
        }
      }
      if(this.media != undefined){
        this.text = `${(this.media.type === 'image')?this.getImage(): this.getVideo()}${this.text}`;
      }
    }
  }
}
</script>

<style scoped>
.wrap-text {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
