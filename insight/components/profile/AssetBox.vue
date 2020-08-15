<template>
    <div @click="clicked" class="w-32 h-32 mx-2">
        <img v-if="this.type === 'image'" :src="src" class="w-full h-full"  />
        <img v-if="this.type === 'audio'" :src="audImg" class="w-full h-full" />
        <video preload="auto" :src="src" v-if="this.type === 'video'" class="w-full h-full" />
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
            }
        },
        clicked: function(){
            this.$router.push(`/post/${this.post.post_id}`);
        }
    }
}
</script>