<template>
    <div class="w-full h-full overflow-y-scroll flex flex-col">

      <!-- First Page -->
       <div class="w-full h-screen py-6 px-4 bg-red-600">
         <div class="h-16 w-full px-2 py-2 flex text-red-600">
            <p @click="$router.push('/auth/login')"  class="px-6 py-2 bg-white shadow-lg rounded-full">
            <span class="text-2xl">Login</span>
            </p>
         </div>
         <div class="w-full h-auto mt-20">
           <p class="text-6xl text-white font-lato font-bold">Unleash
           </p>
           <p class="text-3xl text-white  font-muli font-bold"> your hidden talent</p>
          <p class="text-6xl text-white font-muli font-bold">
            Explore
          </p>
          <p class="text-4xl text-white font-muli font-bold">the community you always
            <span class="px-4 py-1 bg-white shadow-lg text-red-600">dreamt.</span></p>
         </div>
       </div>

       <!-- Second Page -->
       <div class="w-full h-screen py-6 px-4 bg-purple-900">
         <div class="w-full h-auto mt-24 ">
          <p class="text-3xl text-green-500 font-muli font-bold">If you won't run out</p>
          <p class="text-3xl text-green-500 font-muli font-bold"> from <span class="text-4xl text-white">rat race</span></p>
          <p class="text-4xl text-green-500 font-muli font-bold">You will</p>
          <p class="text-3xl text-green-500 font-muli font-bold">endup where rats stay</p>
          <p class="text-3xl text-green-500 font-muli font-bold">In the <span class="text-4xl text-white">dark hole </span></p>
          <p class="text-3xl text-white font-muli mt-6 font-bold">
            <span class="text-4xl text-green-500">Showcase</span>
            your hidden talent on our platform</p>
          <p class="text-3xl text-white font-muli font-bold">get ranked among with same talent</p>
          <p class="text-3xl text-white font-muli font-bold">receive <span class="text-green-500">unimaginable opportunities</span> from home</p>
         </div>
       </div>

       <!-- Third Page -->
       <div class="w-full h-screen py-6 px-4" style="background-color:#FCF6F5FF;">
         <div class="w-full h-auto mt-32" style="color:#2BAE66FF;">
           <p class="text-4xl">You always</p>
           <p class="text-4xl">wanted to express</p>
           <p class="text-4xl" >
             <span class="px-4 py-2" style="background-color:#2BAE66FF;color:#FCF6F5FF;">your talent</span></p>
           <p class="text-4xl">couldn't because of</p>
           <p class="text-4xl">peer pressure, <span class="underline">responsibilities</span></p>
           <p class="text-4xl"> or whatever</p>

         </div>
       </div>

       <!-- Fourth Page -->
       <div class="w-full h-screen py-6 px-4" style="background-color:#101820FF;">
         <div class="w-full h-auto mt-16" style="color:#F2AA4CFF;">
           <p class="text-4xl">Time has changed</p>
           <p class="text-4xl">Keep posting amazing contents</p>
           <p class="text-4xl">compete and make friends</p>
           <p class="text-4xl">form community</p>
           <p class="text-4xl">you craved for</p>
            <p class="text-4xl">wait untill you become</p>
           <p class="text-4xl" >
             idol to be
             <span class="px-4 py-2 bg-white text-black shadow-xl">followed</span></p>

         </div>
       </div>
    </div>
</template>

<script>
import FrozenStorage from "@/static/js/local_storage.js";
export default{
  mounted() {
    this.insetDataInStorage();
  },
  methods:{
    insetDataInStorage: function(){
      let storage = new FrozenStorage();
      storage.set('vintro','1');
    }
  }
}
</script>

<style scoped>

</style>
