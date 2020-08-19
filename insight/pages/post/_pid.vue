<template>
  <div  :class="`w-full h-full flex flex-col ${(showComments) ? 'bg-black':'bg-white'}`">
      <div class="w-full h-auto">
        <post-box  @enable-comment="commentstate" :commentActive="!showComments" :propsAsset="post" />
      </div>
      <div v-if="post.footer != undefined">
        <comment-box :active="showComments" :comments="post.footer.comments"/>
      </div>
      <comment-input-box @new-comment="updateComment" :pid="post.post_id" :active="showComments" />
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
    const url = `${"http://condom.freaquish.com/api/v1/"}post/${params.pid}`;
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
      const url = `${"http://condom.freaquish.com/api/v1/"}post_comment?pid=${this.pid}`;
      this.$axios.get(url).then(res => {
        this.post.footer.comments = res.data.comments;
        console.log(this.post)
      })
    }
  }
}
</script>

<style scoped></style>
