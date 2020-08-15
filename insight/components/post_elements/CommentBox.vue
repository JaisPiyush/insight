<template>
  <div v-if="this.active" class="w-full h-auto">
      <div v-for="comment in comments" :key="comments.indexOf(comment)">
          <comment-text :data="comment" />
      </div>
  </div>
</template>

<script>
import CommentText from "@/components/post_elements/CommentText.vue";
export default {
  props: ['active'],
  components:{
      CommentText
  },
  data(){
      return {
         comments:[
             {
                 avatar: "https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg",
                 data: "Hey this is wrong.",
                 username: "jarden@103"
             },
             {
                 avatar: "https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg",
                 data: "Hey this is wrong. I would like to work better",
                 username: "jarden@103"
             },
             {
                 avatar: "https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg",
                 data: "Hey this is wrong. but insane working thesis of workflow my hinder th e jablle effects of psion",
                 username: "jarden@103"
             },
             {
                 avatar: "https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg",
                 data: "Hey this is wrong.",
                 username: "jarden@103"
             },
             {
                 avatar: "https://www.screengeek.net/wp-content/uploads/2018/11/avatar-movie.jpg",
                 data: "Hey this is wrong.",
                 username: "jarden@103"
             }
         ]
      }
  }
}
</script>

<style scoped></style>
