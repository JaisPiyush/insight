<template>
  <div class="w-full h-screen">
    <loading-container
      :loading="loadingState"
      text="Your post is going live after the upload."
    >
      <div class="w-full h-screen bg-white flex flex-col justify-center ">
        <div class="w-full h-auto px-4 flex flex-col ">
         <img src="@/assets/svg/error_svg.svg" class="w-48 m-auto" />
         <p class="m-auto my-4 font-muli text-lg font-bold text-gray-800">{{errorMessage}}</p>
         <button @click="$router.push(nextUrl)" class="w-full py-4 shadow-md font-lato font-bold text-lg text-white rounded-lg bg-pink-500">Go Back</button>
        </div>
      </div>
    </loading-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {errorSvg} from "@/static/js/assets.js";
import LoadingContainer from '@/components/LoadingContainer.vue';
export default {
  mounted(){
      this.$nextTick().then(() => {
          this.uploadFilesToFirebase();
      })
  },
  components: {
    LoadingContainer
  },
  computed: {
    ...mapState('post/create', [
      'completed',
      'sentData',
      'error',
      'errorMessage',
      'nextUrl'
    ]),
    loadingState: function() {
      console.log(this.error, this.completed, this.sentData)
      if(this.error){
          return false;
      }else if(this.completed){
        //   this.sentDataToServer();
          return !this.completed && !this.error;
      }else{
          return !this.completed && !this.error;
      }
    }
  },
  data() {
    return {
        errorSvg: errorSvg
    }
  },
  methods: {
    ...mapActions('post/create', ['sendDataToServer','uploadFilesToFirebase'])
  }
}
</script>

<style scoped></style>
