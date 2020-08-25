<template>
  <div class="w-full h-screen bg-black overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="w-full h-20 pt-4 px-2 flex mb-6">
      <span
        @click="navigateBack"
        class="material-icons stroke-current text-white text-4xl"
      >
        keyboard_arrow_left
      </span>

      <div class="w-full h-full flex flex-row-reverse">
       
       <!-- Next Button -->
        <div @click="nextNavigation" class="w-12 h-10 rounded-md">
          <span class="material-icons stroke-current text-4xl text-pink-600">
            keyboard_arrow_right
          </span>
        </div>
        
        <!-- Delete Button -->
        <div @click="removeCurrentAsset" v-if="this.showDelete()" class="w-12 h-12 rounded-md">
          <span class="material-icons stroke-current text-3xl text-white">
            delete_outline
          </span>
        </div>

      </div>
    </div>

    <!-- Center Screen -->
    <center-screen :asset="getCurrentAsset()" />

    <!-- Media Card -->
    <div class="w-full h-20 px-2 py-2 overflow-x-scroll flex mt-10">
        <div v-for="asset of iterateCollection()" :key="collection.indexOf(asset)" >
            <SampleCard :asset="asset" :index="collection.indexOf(asset)" @pick="cardChanged" />
        </div>
    </div>

    <!-- Footer -->
    <div class="w-full h-20 flex justify-around mt-4">
        <media-picker filetype="image" multiple="true" @pick="catchInputChange">
           <image-svg class="w-full h-full" />
        </media-picker>

        <media-picker filetype="video" multiple="true" @pick="catchInputChange">
           <video-svg class="w-full h-full" />
        </media-picker>

        <media-picker filetype="audio" multiple="true" @pick="catchInputChange">
           <audio-svg class="w-full h-full" />
        </media-picker>
    </div>

  </div>
</template>

<script>
import CenterScreen from '@/components/editor_elements/CenterScreen'
import MediaPicker from '@/components/editor_elements/MediaPicker'
import SampleCard from '@/components/editor_elements/SampleCard'
import ImageSvg from '@/assets/svg/ImageSvg.vue'
import audioSvg from '@/assets/svg/audioSvg.vue'
import VideoSvg from '@/assets/svg/VideoSvg.vue'
import { AssetCollection, Asset } from '@/static/js/custome_editor.js'
import {mapMutations} from "vuex"
export default {
  components: {
    CenterScreen,
    MediaPicker,
    SampleCard,
    ImageSvg,
    audioSvg,
    VideoSvg
  },

  mounted() {
    this.collection = new AssetCollection();
    window.collection = this.collection
  },
  data() {
    return {
      collection: undefined,
      index:0
    }
  },

  methods: {
      ...mapMutations('post/create', ['insertAssets']),
    navigateBack: function() {
      if (this.collection != undefined) {
        this.collection.revoke()
      }
      this.$router.go(-1)
    },
    showDelete: function(){
        if(this.collection != undefined && this.collection.length() > 0){
            return true;
        }
        return false;
    },
    getCurrentAsset: function(){
        if(this.showDelete()){
            return this.collection.at(this.index);
        }else{
            return undefined
        }
    },
    cardChanged: function(index){
        this.index = index;
    },
    fileReader: function(src){
        let url = window.URL.createObjectURL(src);
        return url;
    },
    catchInputChange: function(data){
        if(data.type === "image"){
            for(let file of data.files){
                this.collection.push({src:this.fileReader(file),contenttype:data.type});
            }
        }else if(data.type === "video" || data.type === "audio"){
            let index = this.collection.presentAt(data.type);
            if(index === null){
                this.collection.push({src:data.files[0],contenttype:data.type});
            }else{
                this.collection.replace(index,{src:data.files[0],contenttype:data.type});
            }
        }
    },
    iterateCollection: function(){
        if(this.collection === undefined){
            return [];
        }
        return this.collection.getAssets();
    },

    removeCurrentAsset: function(){
        this.collection.removeAt(this.index);
        if(this.index === this.collection.length()){
            if(this.index != 0){
                this.index -= 1;
            }else{
                this.index = 0;
            }
        }
    },

    nextNavigation: function(){
        if(this.collection.length() > 0){
            let assets = {};

            this.collection.forEach((asset, index) => {
              if(asset.getContentType() === "image"){
                if(assets.images === undefined){
                  assets.images = [];
                }
                assets.images.push(asset.getSrc());
              }else{
                assets[asset.getContentType()] = asset.getSrc();
              }
            });
            assets.editor = 'custom_editor';
            this.insertAssets(assets);

        }
    }
  }
}
</script>

<style scoped>

