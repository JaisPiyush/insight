<template>
  <div class="w-full h-screen flex flex-col overflow-x-hidden overflow-y-auto bg-black">
      <post-box @enable-comment="commentstate" :commentActive="!showComments" />
      <comment-box :active="showComments"/>
  </div>
</template>

<script>
import PostBox from '@/components/post_elements/PostBox.vue';
import CommentBox from '@/components/post_elements/CommentBox.vue'
export default {
  components: {
    PostBox,
    CommentBox
  },
  data(){
    return{
      showComments:true
    }
  },
  methods:{
    commentstate: function(){
      this.showComments = !this.showComments;
    }
  }
}
</script>

<style scoped></style>
