<template>
    <div class="w-20 h-16 mx-2 relative" @click="activateCard()">
        <!-- Supported Media Type -->
        <div class="center-screen-front w-full h-full absolute z-0"></div>
        <div class="w-full h-full absolute z-10 bg-transparent">

        </div>
    </div>
</template>

<script>
// Suported Media Type value image,color,video,song,svg
export default {
    props:['mediaType','index','currentIndex','src'],
    mounted(){
        if(this.currentIndex === this.index){
            this.activated = true;
        }else{
            this.activated = false;
        }
        // console.log(this.src)
        let elem = this.$el.getElementsByClassName('center-screen-front')[0];
        elem.outerHTML = this.src.innerHTML;
        if (this.mediaType === 'image'){
        let img = this.$el.querySelector('img');
        this.dataSrc = img.src;
        }
    },
    data(){
        return {
            activated:false,
            classList: ["w-6","h-12"],
            dataSrc:undefined
        }
    },
    methods:{
        activateCard: function(){
            this.$emit('activation',{index:this.index,mediaType:this.mediaType,src:this.dataSrc});
        },
        deactivateCard: function(){
            // this.$el.classList = this.classList.join(" ");
        },
    }

}
</script>