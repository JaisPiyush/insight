<template>
  <div class="w-full h-screen">
    <loading-container
      :loading="loadingState"
      text="Your post is going live after the upload."
    >
      <div  class="w-full h-screen bg-white flex flex-col justify-center ">
        <div v-if="!this.isProgressState()" class="w-full h-auto px-4 flex flex-col ">
         <img src="@/assets/svg/error_svg.svg" class="w-48 m-auto" />
         <p class="m-auto my-4 font-muli text-lg font-bold text-gray-800">{{errorMessage}}</p>
         <button @click="clearStore" class="w-full py-4 shadow-md font-lato font-bold text-lg text-white rounded-lg bg-pink-500">Go Back</button>
        </div>
        <upload-meter v-else :src="progress.src" :perc="progress.progress" :type="progress.type" />
      </div>
    </loading-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {errorSvg} from "@/static/js/assets.js";
import LoadingContainer from '@/components/LoadingContainer.vue';
import UploadMeter from "@/components/post_elements/UploadMeter.vue";
export default {
  mounted(){
      this.$nextTick().then(() => {
          this.createPost();
      })
  },
  components: {
    LoadingContainer,
    UploadMeter
  },
  computed: {
    ...mapState('post/create', [
      'completed',
      'sentData',
      'error',
      'errorMessage',
      'nextUrl',
      'progress'
    ]),
    loadingState: function() {
      return false; //to be removed
      if(this.error){
          return false;
      }else if(this.completed){
          return !this.completed && !this.error;
      }else{
          return !this.completed && !this.error;
      }
    },

  },
  data() {
    return {
        errorSvg: errorSvg
    }
  },
  methods: {
    ...mapActions('post/create', ['createPost']),
    ...mapMutations('post/create',['reset']),
    clearStore: function(){
      this.reset();
      this.$router.push('/');
    },
    isProgressState: function(){
      if(JSON.stringify(this.progress) != JSON.stringify({})){
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped></style>
