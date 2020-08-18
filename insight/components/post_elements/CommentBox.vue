<template>
  <div v-if="this.active" class="w-full h-auto" style="min-height:32vh;">
      <div v-for="comment in comments" :key="comments.indexOf(comment)">
          <comment-text :data="comment" />
      </div>
  </div>
</template>

<script>
import CommentText from "@/components/post_elements/CommentText.vue";
export default {
  props: ['active','comments'],
  components:{
      CommentText
  },
  data(){
      return {
      }
  }
}
</script>

<style scoped></style>
