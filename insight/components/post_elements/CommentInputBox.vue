<template>
  <div v-if="this.active" class="w-full h-auto px-2 py-2 bg-black  border-gray-200 border-l-0 border-b-0 border-b-0 bottom-0 flex">
    <textarea v-model="comment" type="text" class="w-full caret outline-none pl-2 pt-1 border border-white bg-black font-muli text-white rounded-md no-underline" placeholder="Comment..." />
    <button @click="sendComment" class="ml-2 w-12 h-12 pl-4 pr-4 pt-2 pb-1 mt-1 rounded-md bg-purple-600">
      <span class="material-icons text-white">
        send
      </span>
    </button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  props:['active','pid'],
  data(){
    return {
      comment: undefined
    }
  },
  methods: {
    ...mapActions("post/post_actions" , ['microActionPost']),
    sendComment: function(){
      if(this.comment != undefined && this.comment.length > 0){
        this.microActionPost({action:"comment", comment: this.comment, pid:this.pid,action_complete:() => {
          this.$emit('new-comment');
        }});
      }
    },
  }
}
</script>

<style scoped>
.caret{
    caret-color: white;
}
</style>
