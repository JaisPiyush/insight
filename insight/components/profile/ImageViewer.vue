<template>
    <div v-if="this.active" class="w-full h-screen flex flex-col bg-black">
        <div class="w-full flex justify-between h-12 py-2 px-4">
            <span @click="$emit('revert',false)" class="material-icons stroke-current text-white">keyboard_backspace</span>
            <button @click="doneClicked" v-if="this.edit" class="px-4 rounded-md font-muli font-bold bg-white shadow-md">Done</button>
        </div>
        <div class="w-full py-24" style="height:80vh;">
            <img :src="src" class="w-full" style="height:45vh;" />
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
    props:['active','src','edit'],
    methods: {
        ...mapActions("profile/profile",['uploadImageToFirebase']),
        doneClicked: function(){
            this.$emit('revert',false);
            this.stateLoading(true);
            let self = this;
            this.uploadImageToFirebase({src:self.src, func:() => {
                self.stateLoading(false);
            }})
        },
        stateLoading: function(val,text){
            this.$emit('stateloading',val,text)
        }
    }
}
</script>