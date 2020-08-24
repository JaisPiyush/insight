<template>
    <div @click="clicked" class="w-20 h-24 mx-2">
        <img v-if="this.type === 'image'" :src="src" class="w-full h-full"  />
        <img v-if="this.type === 'audio'" :src="audImg" class="w-full h-full" />
        <video preload="auto" :src="src" v-if="this.type === 'video'" class="w-full h-full" />
        <div class="w-full h-full overflow-hidden" v-if="this.type === 'text'">
          <p class="wrap-text text-sm">{{post.assets.text.data}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:['post'],
    mounted(){
        this.insertAsset();
    },
    data(){
        return {
            src: undefined,
            type: undefined,
            audImg: 'https://firebasestorage.googleapis.com/v0/b/social-express-103904.appspot.com/o/assets%2Flogo.jpeg?alt=media&token=ac16b5c8-42aa-45a2-ae29-05809fba116f'
        }
    },
    methods:{
        insertAsset: function(){
            if(this.post.assets.images != undefined && this.post.assets.images.length > 0){
                this.src=this.post.assets.images[0];
                this.type = 'image';
            }else if(this.post.assets.video != undefined){
                this.src = this.post.assets.video;
                this.type = 'video';
            }else if(this.post.assets.audio != undefined){
                this.type = 'audio'
            }else if(this.post.assets.text != undefined){
              this.type = 'text'
              if(this.post.assets.text.bgColor != undefined){
                 this.$el.style.setProperty('background-color',this.post.assets.text.bgColor);
              }
              if(this.post.assets.text.fontColor != undefined){
                this.$el.style.setProperty('color',this.post.assets.text.fontColor);
              }
             if(this.post.assets.text.fontName != undefined){
               this.$el.style.setProperty('font-family',this.post.assets.text.fontName);
             }
            }
        },
        clicked: function(){
            this.$router.push(`/post/${this.post.post_id}`);
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
