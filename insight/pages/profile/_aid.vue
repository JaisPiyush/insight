<template>
  <div class="w-full h-full overflow-hidden">
    <!-- profile main page -->
    <loading-container :loading="loading" :text="loadingText">
      <image-viewer
        @revert="toggleImageView"
        :active="imageView"
        :src="image"
        :edit="false"
        @stateloading="changeloading"
      />
      <div v-if="!this.imageView && !this.placeBox" class="flex flex-col">
        <div class="flex px-4 justify-between py-4">
          <span @click="$router.go(-1)" class="material-icons">keyboard_backspace</span>
        </div>

        <div class="flex justify-between px-10">
          <div class=" mt-10 text-center">
            <h1 class="text-green-400 text-base font-lato font-semibold">
              Followers
            </h1>
            <h1 class="text-black text-md">{{ retroText(followers) }}</h1>
          </div>

          <!-- Profile image -->
          <div class="profimg w-24 h-24 rounded-full">
            <img
              @click="showImage"
              :src="avatar"
              class="rounded-full w-24 h-24"
            />
          </div>

          <!-- Profile image -->

          <div class="mt-10 text-center">
            <h1 class="text-green-400 text-base font-lato font-semibold">
              Following
            </h1>
            <h1 class="text-black text-md">{{ retroText(following) }}</h1>
          </div>
        </div>
        <p class="username text-center text-blue-600 text-sm mt-6">
          @{{ username }}
        </p>
        <div class="w-full h-auto flex justify-center">
          <p
            id="name-text"
            class="name text-center ml-4 font-muli font-semibold text-base focus:outline-none"
          >{{firstName}} {{lastName}}</p>
        </div>

        <!-- user bio -->
        <div class="w-full h-auto flex flex-col">
          <div
            class="w-full flex h-16 flex-row-reverse py-2 px-4 focus:outline-none"
          >
          </div>
          <p
            id="profile-description"
            class="word w-full py-2 h-auto px-6 overflow-y-scroll focus:outline-none font-muli text-bold text-sm mx-4`"
            style="width:90%;"
            v-html="descriptionText"
          ></p>
        </div>

        <!--- Collections and Leaderboard -->
        <div class="w-full  mt-6 h-auto flex flex-col" style="min-height:30vh;">
          <div class="w-full h-16 flex px-6 py-2">
            <p class="font-muli text-gray-500 font-bold">Collections</p>
          </div>
          <div
            class="w-full h-auto"
            style="display:grid;gird-template-columns:1fr 1fr 1fr;"
          >
            <div v-for="post in collections" :key="post.post_id">
              <asset-box :post="post" />
            </div>
          </div>
        </div>
      </div>
    </loading-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ImageViewer from "@/components/profile/ImageViewer.vue";
import LoadingContainer from "@/components/LoadingContainer.vue"
import AssetBox from "@/components/profile/AssetBox.vue";
import {avatarDefault} from '~/static/js/assets'
export default {
  asyncData({ params }) {
    return { aid: params.aid }
  },
  mounted() {
    let self = this;
    this.fetchThirdProfile({aid:this.aid,func:()=>{
        self.renderDescription(self.description);
    }})
  },
   components: {
      ImageViewer,
      LoadingContainer,
      AssetBox
  },
  data(){
    return{
        image: this.avatar,
        imageView: false,
        loadingText: 'Loading data.',
        placeBox:false,
        nameText:'',
        descriptionText:'',
        defaultAvatar: avatarDefault
    }
  },
   computed: {
    ...mapState('profile/profile', [
      'avatar',
      'places',
      'description',
      'following',
      'followers',
      'firstName',
      'lastName',
      'editable',
      'username',
      'collections',
      'loading',
      'error'
    ]),
  },
  methods: {
    ...mapActions('profile/profile', ['fetchThirdProfile']),
    retroText: function(text) {
      if (text >= 1000) {
        return `${(text / 1000).toFixed(2)}K`
      } else {
        return text
      }
    },
    showImage: function(){
      this.image = this.avatar;
      this.imageView = true;
    },
    renderDescription: function(txt) {
      let text = txt || ''
      let match = text.match(/@[a-z0-9_?]+|#[a-z0-9_?]+/gi) || []
      for (let index = 0; index < match.length; index++) {
        if (match[index].includes('#')) {
          text = text.replace(
            match[index],
            `<span class="font-montserrat text-blue-500 italic">${match[index]}</span>`
          )
        } else if (match[index].includes('@')) {
          text = text.replace(
            match[index],
            `<span class="font-montserrat text-blue-700">${match[index]}</span>`
          )
        }
      }
      this.descriptionText = text;
    },
    setNameText: function(val){
        this.nameText = val;
        let elem = this.$el.querySelector('#name-text');
        elem.innerHTML = this.nameText;
    },
    changeloading: function(val,text){
      this.setLoadingState(val);
      this.loadingText = text;
    },
    toggleImageView: function(val){
        this.imageView = val;
    }
  }
}
</script>

<style scoped></style>
