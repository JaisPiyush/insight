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
        <button @click="$router.push('/post/hobby_window')" class="w-8 h-8 bg-pink-500 pt-1 rounded-full"><span class="material-icons stroke-current text-white">add</span></button>
        <button class="mr-4 w-8 h-8 bg-gray-300 pt-1 rounded-full" ><span class="material-icons">settings</span></button>
      </div>
      </div>
      <div class="body flex flex-col">
        <div v-for="post in posts" :key="post.post_id">
            <post-box :propsAsset="post" :index="posts.indexOf(post)" :cindex="cindex" :commentActive="true" @current-index="updateIndex" />
        </div>
      </div>
    </div>
  </loading-container>
  </div>
</template>

<script>
import PostBox from '@/components/post_elements/PostBox.vue'
import LoadingContainer from '@/components/LoadingContainer.vue'
import FrozenStorage from '@/static/js/local_storage';
import {mapState, mapActions} from "vuex";
import {avatarDefault} from '~/static/js/assets'
export default {
  components: {
    PostBox,
    LoadingContainer
  },
  mounted() {
    this.checkIntroViewed(this.fetchFeed);
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
        func();
      }
    },
    navigateToSelf: function(){
      this.$router.push('/profile/self');
    }
  }
}
</script>

<style scoped></style>
