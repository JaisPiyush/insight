<template>
  <div class="w-full h-full flex flex-col">
     <div class="w-full h-10 px-4 py-2 mt-4">
       <span @click="$router.go(-1)" class="material-icons">
         keyboard_backspace
       </span>
     </div>
      <post-box  @enable-comment="commentstate" :bind="false" :commentActive="!showComments" :propsAsset="post" />
      <div v-if="post.footer != undefined && false">
        <comment-box :active="showComments" :comments="post.footer.comments"/>
      </div>
      <comment-input-box @new-comment="updateComment" :pid="post.post_id" :active="showComments && false" />
  </div>

</template>

<script>
import PostBox from '@/components/post_elements/PostBox.vue';
import LoadingContainer from "@/components/LoadingContainer.vue";
import CommentBox from '@/components/post_elements/CommentBox.vue';
import CommentInputBox from '@/components/post_elements/CommentInputBox.vue';
import {mapState, mapActions} from "vuex";
export default {
  asyncData({params, app}){
    const url = `post/${params.pid}`;
    return app.$axios.get(url).then(res=>{
      return {post:res.data,pid:params.pid};
    });
  },
  components: {
    LoadingContainer,
    PostBox,
    CommentBox,
    CommentInputBox
  },
  mounted(){
  },
  data(){
    return{
      showComments:true,
    }
  },
  computed: {
    ...mapState("main",['onePost','loading','error'])
  },
  methods:{
    ...mapActions("main",['fetchPost']),
    commentstate: function(){
      this.showComments = !this.showComments;
    },
    pullPost: function(){
      this.fetchPost({pid:this.pid, func: () => {}})
    },
    updateComment: function(){
      const url = `post_comment?pid=${this.pid}`;
      this.$axios.get(url).then(res => {
        this.post.footer.comments = res.data.comments;
        console.log(this.post)
      })
    }
  }
}
</script>

<style scoped></style>
