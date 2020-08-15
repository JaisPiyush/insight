<template>
  <div :class="`w-full h-full flex flex-col ${(showComments) ? 'bg-black':'bg-white'}`">
      <div class="w-full h-auto">
        <post-box @enable-comment="commentstate" :commentActive="!showComments" />
      </div>
      <comment-box :active="showComments"/>
      <comment-input-box :active="showComments" />
  </div>
</template>

<script>
import PostBox from '@/components/post_elements/PostBox.vue';
import CommentBox from '@/components/post_elements/CommentBox.vue';
import CommentInputBox from '@/components/post_elements/CommentInputBox.vue';
export default {
  components: {
    PostBox,
    CommentBox,
    CommentInputBox
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
