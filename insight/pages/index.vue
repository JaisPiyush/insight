<template>
  <div class="w-full h-full" id="home">
  <loading-container :loading="loading">
    <div
      class="w-full h-full py-2 flex flex-col overflow-x-hidden overflow-y-scroll"
    >
      <div v-if="this.registered" class="header py-2 flex px-4">
        <img @click="navigateToSelf" :src="avatar" class="w-12 h-12 rounded-full" />
        <div class="w-auto ml-4 mt-2 h-full flex flex-col justify-center">
          <p @click="navigateToSelf" class="font-lato font-semibold text-2xl">{{ firstName }}</p>
        </div>
        <div class="h-full w-full flex flex-row-reverse px-4 py-2">
        <button @click="$router.push('/post/hobby_window')" class="w-8 h-8 bg-pink-500 pt-1 focus:outline-none rounded-full"><span class=" material-icons stroke-current text-white">add</span></button>
        <button @click="$router.push('/settings')" class="mr-4 w-8 h-8 bg-gray-300 pt-1 rounded-full focus:outline-none" ><span class="material-icons">settings</span></button>
      </div>
      </div>
      
      <div class="body flex flex-col bg-gray-200">
        <div v-for="post in posts" :key="posts.indexOf(post)">
            <post-box :propsAsset="post" :index="posts.indexOf(post)" :cindex="cindex" :commentActive="true" @current-index="updateIndex" @enable-comment="$router.push(`/post/${post.post_id}`)" />
        </div>
      </div>
     
    </div>
  </loading-container>
   <!-- <bottom-bar></bottom-bar> -->
  </div>
</template>

<script>
import PostBox from '@/components/post_elements/PostBox.vue'
import LoadingContainer from '@/components/LoadingContainer.vue'
import FrozenStorage from '@/static/js/local_storage';
import {mapState, mapActions} from "vuex";
import {avatarDefault} from '~/static/js/assets';
import IsInViewport from "@/static/js/in-viewport.js";
import Header from "@/components/home/Header.vue";

export default {
  components: {
    PostBox,
    LoadingContainer,
    Header,
  },
  mounted() {
    this.checkIntroViewed(this.fetchFeed);
    this.$nextTick().then(()=>{
      // let viewMonitor = new IsInViewport(this.$el);
      // viewMonitor.$init(()=>{

      // });
    })
  },
  data() {
    return {
      registered: true,
      cindex:0,
      observer: undefined,
      defaultAvatar: avatarDefault
    }
  },
  computed:{
    ...mapState("main",['firstName','avatar','loading','posts','error'])
  },
  methods: {
    ...mapActions("main",['fetchFeed']),
    updateIndex: function(index){
        this.cindex = index;
    },
    checkIntroViewed: function(func){
      let storage = new FrozenStorage();
      let viewed = storage.get('vintro');
      if(viewed === null || viewed != '1'){
        this.$router.push('/intro');
      }else{
        let token = storage.get('token')
        if(token === null){
          this.$router.push('/auth/login')
        }else{
          func();
        }

      }
    },
    navigateToSelf: function(){
      this.$router.push('/profile/self');
    }
  }
}
</script>

<style scoped></style>
