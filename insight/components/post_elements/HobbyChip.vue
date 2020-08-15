<template>
  <div @click="onClick" class="w-auto h-auto px-4 py-2 rounded-full bg-pink-600" >
    <p class="font-muli text-bold text-white text-lg">{{hobby.name}}</p>
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
        this.$router.push(`/editors/${this.hobby.editor}`);
      }
      
    }
}
</script>
