<template>
  <div @click="onClick" class="w-auto h-auto px-4 py-2 my-2 mx-1 rounded-full bg-pink-600" >
    <p class="font-muli text-bold text-white text-sm">{{hobby.name}}</p>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
    props: ['hobby'],
    methods:{
      ...mapMutations("post/create",['setHobby']),
      onClick: function(){
        this.setHobby(this.hobby);
        this.$router.push(`/editors/editor_window`);
      }

    }
}
</script>
