<template>
   <client-only>
    <div class="overflow-hidden w-full h-screen flex flex-col pt-6">
        <div class="flex flex-col h-16 w-full px-4">
            <div class="w-full h-auto flex justify-between">
             <h1 class="font-lato font-semibold text-2xl text-black">Type Writer</h1>
             <button @click="moveNext" class="px-4 py-2 rounded-md bg-blue-500 text-white font-muli">Next</button>
            </div>
            <p class="font-muli font-bold px-2 py-1 rounded-md w-64 bg-green-400 text-lg text-white mt-1">Write something innovative</p>
        </div>
        <div class="mt-8 px-4 w-full editor-parent">
           <div contenteditable="true" id="editor" @focus="activateFocus()" @blur="infocus= false" @change=" insertDataInState()" class="overflow-auto w-full h-full border border-2 font-bold font-lg border-purple-600 focus:outline-none rounded-sm px-4 py-4">
              {{data}}
           </div>
        </div>
        <div v-if="!this.infocus && (this.img != undefined || this.video != undefined)" class="media-deck h-auto flex ">
            <img v-if="this.img != undefined && this.video === undefined" :src="this.img" class="w-full h-full" />
            <video v-if="this.video != undefined && this.img === undefined" :src="this.video" class="w-full h-full" controls />
            <button @click="removeMedia()" class="mx-2 h-16 px-2 py-2 rounded-md shadow-md bg-black">
                <delete-svg class="w-10 h-10 stroke-current stroke-4 text-white" />
            </button>
        </div>
        
        <div v-if="!this.infocus && (this.colorRequired || this.fontRequired)" class="absolute bottom-0 mb-20 w-full h-48 py-4 px-4 ">
            <div v-if="this.colorRequired" class="flex w-full h-auto overflow-x-scroll overflow-y-hidden py-2">
                <div v-for="color in assetColors" :key="assetColors.indexOf(color)" >
                    <color-box :color="color" @color-selected="selectColor" />
                </div>
            </div>
            <div v-if="this.fontRequired" class="flex w-full h-auto overflow-x-scroll overflow-y-hidden">
                <div v-for="font in assetFonts" :key="assetFonts.indexOf(font)" >
                    <font-box @font-selected="fontSelected" :font="font" :bgColor="currentBgColor" :txtColor="currentTextColor" />
                </div>
            </div>
        </div>

        <div class="absolute bottom-0 rounded-md dash-width h-12 my-4 py-2 flex justify-around">
            <i @click="pickerClicked('image-picker')"  class="fa fa-picture-o stroke-current text-white fa-lg px-2 py-2" aria-hidden="true"></i>
             <input
            type="file"
            accept="image/*"
            id="image-picker"
            class="display-none"
            @change="imagePicked()"
          />
            <i  @click="pickerClicked('video-picker')" class="fa fa-video-camera stroke-current text-white fa-lg px-2 py-2" aria-hidden="true"></i>
            <input
            type="file"
            accept="video/*"
            id="video-picker"
            class="display-none"
            @change="videoPicked()"
          />
           <!-- <a href="javascript:void(0)" @click="format('bold')" ><i class="fa fa-bold stroke-current text-white fa-lg px-2 py-2" aria-hidden="true"></i></a>
            <a href="javascript:void(0)" @click="format('italic')"><i  class="fa fa-italic stroke-current text-white fa-lg px-2 py-2" aria-hidden="true"></i></a> -->
            <i @click="fontTrigger()" class="fa fa-text-width stroke-current text-white fa-lg px-2 py-2" aria-hidden="true"></i>
            <i @click="paintText()" class="fa fa-font stroke-current text-white fa-lg px-2 py-2" aria-hidden="true"></i>
            <i @click="paintBackground()"  class="fa fa-paint-brush stroke-current text-white fa-lg px-2 py-2" aria-hidden="true"></i>
        </div>
    </div>
   </client-only>
</template>

<script>
import {colors, fonts} from '@/static/js/assets.js';
import ColorBox from "@/components/editor_elements/ColorBox.vue";
import FontBox from "@/components/editor_elements/FontBox.vue";
import DeleteSvg from "@/assets/svg/DeleteSvg.vue";
import {mapState, mapMutations} from "vuex";
export default {
    updated(){
        let editor = document.getElementById('editor');
        editor.style.setProperty('background-color', this.currentBgColor);
        editor.style.setProperty('color', this.currentTextColor);
        editor.style.setProperty('font-family', this.currentFont);
        this.editor = editor;
        // this.currentBgColor = this.text.bgColor || colors[0];
        // this.currentFont = this.text.fontColor  || fonts[0];
        // this.currentTextColor = this.text.fontColor || colors[1];
        // this. data = this.text.data || '';
    },
    components:{
        ColorBox,
        FontBox,
        DeleteSvg
    },
    data(){
        return{
            fonts:[],
            img: undefined,
            video: undefined,
            assetColors: colors,
            assetFonts: fonts,
            colorRequired: false,
            fontRequired: false,
            colorTargetFont: false,
            currentBgColor: colors[0],
            currentFont:  fonts[0],
            currentTextColor:  colors[1],
            data: undefined,
            editor: undefined,
            infocus: false
        }
    },
    computed:{
        ...mapState("post/create",['text'])
    },
    methods:{
        ...mapMutations("post/create",['insertTextData','insertAssets']),
        activateFocus: function(){
            this.infocus = true;
        },
        insertDataInState: function(){
            this.data = this.editor.innerText;
            this.insertTextData({data:this.data,fontName: this.currentFont, fontColor: this.currentTextColor, bgColor: this.currentBgColor});
        },
        deactivateFocus: function(){
            this.editor.blur();
            this.infocus = false;
        },
        paintBackground: function(){
            this.deactivateFocus();
            this.colorTargetFont = false;
            this.colorRequired = !this.colorRequired;
        },
        pickerClicked: function (name) {
            let elem = document.getElementById(name);
            elem.click();            
        },
       paintText: function(){
           this.deactivateFocus();
           this.colorTargetFont = true;
           this.colorRequired = !this.colorRequired;
       },
       fontTrigger: function(){
           this.deactivateFocus();
           this.fontRequired= !this.fontRequired
       },

       fontSelected: function(font){
           console.log(font)
           this.currentFont = font;
           this.editor.style.setProperty('font-family', font);
       },
       selectColor: function(color){
           if(this.colorTargetFont){
               this.currentTextColor = color;
               this.editor.style.setProperty('color', this.currentTextColor);
           }else{
               this.currentBgColor = color;
               document.execCommand("backColor", false, this.currentBgColor);
               this.editor.style.setProperty('background-color', this.currentBgColor);
           }
       },
       imagePicked: function(){
           let imagePicker = document.getElementById('image-picker');
           let url = window.URL.createObjectURL(imagePicker.files[0]);
           this.deactivateFocus();
           this.video = undefined;
           this.img = url;
       },
       videoPicked: function(){
           let videoPicker = document.getElementById('video-picker');
           let url = window.URL.createObjectURL(videoPicker.files[0]);
           this.deactivateFocus();
           this.img = undefined;
           this.video = url;
       },
       removeMedia: function(){
           this.img = undefined;
           this.video = undefined;
       },
       moveNext: function(){
           if(this.editor.innerText.length > 0){
               this.insertDataInState();
               if(this.img != undefined){
                   this.insertAssets({images:[this.img], editor: 'type_writer'});
               }else if(this.video != undefined){
                   this.insertAssets({video:this.video, editor: 'type_writer'});
               }
               this.$router.push('/post/caption_page');
           }
       }
    }
}
</script>

<style scoped>
.editor-parent{
    max-height: 60vh;
    height: 20%;
}

.dash-width{
    width: 92%;
    margin-left: 4%;
    background-color: #404247;
}

.display-none{
    display: none;
}

.media-deck{
    width:60vw;
    max-height: 25vh;
    margin: 2rem auto;
}

.stroke-4{
    stroke-width: 4;
}
</style>
