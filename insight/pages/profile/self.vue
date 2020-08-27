<template>
  <div class="w-full h-full overflow-hidden">
    <!-- profile main page -->
    <loading-container :loading="loading" :text="loadingText">
    <image-viewer @revert="toggleImageView" :active="imageView" :src="image" :edit="imageEditable" @stateloading="changeloading" />
    <div v-if="!this.imageView && !this.placeBox" class="flex flex-col">
      <div  class="flex px-4 justify-between py-4">
        <span @click="$router.go(-1)" class="material-icons">keyboard_backspace</span>
        <p @click="$router.push('/settings')" class="font-muli text-green-400 font-bold">Settings ></p>
      </div>

      <div class="flex justify-between px-10">
        <div @click="$router.push('/profile/followers')" class=" mt-10 text-center">
          <h1 class="text-green-400 text-base font-lato font-semibold">
            Followers
          </h1>
          <h1 class="text-black text-md">{{ retroText(followers) }}</h1>
        </div>

        <!-- Profile image -->
        <div class="profimg w-24 h-24 rounded-full">
          <img @click="showImage" :src="avatar" class="rounded-full w-24 h-24" />
          <div class="changeprof rounded-full">
            <div class="prof bg-white rounded-full" @click="pickImage()">
              <i class="proficon fa fa-camera" aria-hidden="true"></i>
              <input
              @change="imagePicked()"
                type="file"
                accept="image/*"
                id="image-picker"
                style="display:none;"
              />
            </div>
          </div>
        </div>

        <!-- Profile image -->

        <div @click="$router.push('/profile/followings')" class="mt-10 text-center">
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
          :contenteditable="nameEditable"
          :class="` name text-center ml-4 font-muli font-semibold text-base focus:outline-none ${(nameEditable)?'pt-2 px-2':''}`"
         v-html="nameText"
        >
        </p>
        <span class="ml-0">
          <button
            v-if="!this.nameEditable"
            @click="toggleNameEditable(true)"
            class="rounded-full px-2 py-2 focus:outline-none"
          >
            <span class="material-icons text-sm">
              create
            </span>
          </button>
          <button
            v-if="this.nameEditable"
            @click="cancelEditedName()"
            class="px-2 py-2 rounded-full focus:outline-none"
          >
            <span class="material-icons text-sm stroke-current text-red-500">
              clear
            </span>
          </button>
          <button
            v-if="this.nameEditable"
            @click="setEditedName()"
            class="px-2 py-2  rounded-full focus:outline-none"
          >
            <span class="material-icons text-sm stroke-current text-green-400">
              done
            </span>
          </button>
        </span>
      </div>

      <!-- user bio -->
      <div class="w-full h-auto flex flex-col">
        <div
          class="w-full flex h-16 flex-row-reverse py-2 px-4 focus:outline-none"
        >
          <button
            v-if="!this.descriptionEditable"
            @click="toggleDescriptionEnable(true)"
            class="px-4 my-2 font-lato  rounded-full bg-gray-300"
          > Edit Bio
            <span class="material-icons text-sm">
              create
            </span>
          </button>
          <button
            v-if="this.descriptionEditable"
            class="px-4 my-2 text-sm rounded-md bg-blue-600 text-white font-lato"
            @click="setDescriptionValue"
          >
            Done
          </button>
          <button
            @click="cancelEditedDescription"
            v-if="this.descriptionEditable"
            class="px-4 my-2 text-sm rounded-md bg-red-600 text-white font-lato mr-4"
          >
            Cancel
          </button>
        </div>
        <p
          :contenteditable="descriptionEditable"
          id="profile-description"
          :class="
            `${
              descriptionEditable ? 'border' : 'border-0'
            } word w-full py-2 h-auto px-6 overflow-y-scroll focus:outline-none font-muli text-bold text-sm mx-4`
          "
          style="width:90%;"
          v-html="descriptionText"
        ></p>
      </div>

      <!--- Collections and Leaderboard -->
      <div class="w-full  mt-6 h-auto flex flex-col" style="min-height:30vh;">
        <div class="w-full h-16 flex px-6 py-2">
          <p class="font-muli text-gray-500 font-bold">Collections</p>
        </div>
        <div class="w-full h-auto flex flex-wrap">
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
import { mapState, mapActions, mapMutations } from 'vuex'
import ImageViewer from "@/components/profile/ImageViewer.vue";
import LoadingContainer from "@/components/LoadingContainer.vue"
import AssetBox from "@/components/profile/AssetBox.vue"
import {avatarDefault} from '~/static/js/assets'
export default {
  mounted() {
    let self = this
    this.fetchProfile(() => {
      self.renderDescription(self.description);
      self.setNameText(`${self.firstName} ${self.lastName}`);
    })
  },
  data() {
    return {
      currentPage: 'profile',
      descriptionEditable: false,
      descriptionText: '',
      nameEditable: false,
      nameText:'',
      placeBox: false,
      image: this.avatar,
      imageEditable: false,
      loadingText:'Updating Data',
      imageView:false,
      defaultAvatar:avatarDefault
    }
  },
  components: {
      ImageViewer,
      LoadingContainer,
      AssetBox
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
    ...mapActions('profile/profile', ['fetchProfile', 'updateProfileData']),
    ...mapMutations('profile/profile', ['setEditablity','setLoadingState','setImageView']),
    pickImage: function() {
      let elem = this.$el.querySelector('#image-picker')
      elem.click();
    },
    imagePicked: function(){
      let imagePicker = this.$el.querySelector('#image-picker');
      let url = window.URL.createObjectURL(imagePicker.files[0]);
      this.image = url;
      this.imageEditable = true;
      this.imageView = true;

    },
    showImage: function(){
      console.log('working')
      this.imageEditable = false;
      this.image = this.avatar;
      this.imageView = true;
    },
    toggleDescriptionEnable: function(enable) {
      this.descriptionEditable = enable
    },
    retroText: function(text) {
      if (text >= 1000) {
        return `${(text / 1000).toFixed(2)}K`
      } else {
        return text
      }
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
    setDescriptionValue: function() {
      let elem = this.$el.querySelector('#profile-description')
      let description = elem.innerText
      this.renderDescription(description)
      this.toggleDescriptionEnable(false)
      this.updateProfileData({ description: description });
    },
    setNameText: function(val){
        this.nameText = val;
        let elem = this.$el.querySelector('#name-text');
        elem.innerHTML = this.nameText;
    },
    toggleNameEditable: function(val) {
      this.nameEditable = val
    },
    cancelEditedName: function(){
        console.log(this.lastName)
        this.toggleNameEditable(false)
        this.setNameText(`${this.firstName} ${this.lastName}`);
    },
    setEditedName: function(){
        this.toggleNameEditable(false);
        let nameTextEditor = this.$el.querySelector('#name-text');
        let spaceSplit = nameTextEditor.innerText.split(" ");
        let firstName,lastName;
        if(spaceSplit.length === 1){
            firstName=this.firstName,lastName=this.lastName
            firstName = spaceSplit[0].toLowerCase().replace(this.lastName.toLowerCase(),'')
            firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        }else{
            firstName = spaceSplit[0];
            lastName = spaceSplit[1];
        }
        this.updateProfileData({first_name: firstName, last_name:lastName});
        this.setNameText(`${firstName} ${lastName}`);


    },
    toggleImageView: function(val){
      this.imageView = val;
    },
    cancelEditedDescription: function(){
        this.renderDescription(this.description);
        this.$el.querySelector('#profile-description').innerHTML = this.descriptionText
        this.toggleDescriptionEnable(false);
    },
    changeloading: function(val,text){
      this.setLoadingState(val);
      this.loadingText = text;
    }
  }
}
</script>

<style scoped>
.profimg {
  position: relative;
}
.profimg .changeprof {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.prof {
  width: 1.7rem;
  height: 1.7rem;
  margin-top: 4rem;
  margin-left: 4rem;
}

.proficon {
  margin: auto;
  margin-top: 0.4rem;
  margin-left: 0.3rem;
  color: blueviolet;
}
.profediticon {
  font-size: 3rem;
  margin-top: 1rem;
  color: rgb(226, 43, 150);
}
.word {
  word-wrap: break-word;
  overflow: hidden;
}
</style>
