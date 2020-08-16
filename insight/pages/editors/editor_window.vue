<template>
  <div class="w-full h-screen flex flex-col bg-green-400">
     <div class="w-full h-16 px-4 py-2 mt-4 flex">
        <span @click="$router.go(-1)" class="material-icons stroke-current text-white">keyboard_backspace</span>
     </div>
     <div class="w-full h-full mt-6 flex flex-col px-4">
      <div @click="$router.push('/editors/custom_editor')"  class="w-full my-4 bg-white py-4 shadow-lg px-2 border border-l-0 border-r-0 rounded-lg">
         <p class="text-lg font-lato font-semibold">Custom Editor</p>
         <p class="text-base font-muli text-gray-600 mt-2">A simple editor for adding video, song or images to your special post</p>
      </div>
      <div @click="$router.push('/editors/type_writer')" class="w-full my-4 bg-white py-4 shadow-lg px-2 border border-l-0 border-r-0 rounded-lg">
         <p  class="text-lg font-lato font-semibold">Type Writer</p>
         <p class="text-base font-muli text-gray-600 mt-2">An editor for writers, compose your thoughts, poem, story or blog spiced with amazing image or video</p>
      </div>
     </div>
  </div>
</template>

<script>
export default{}
</script>

<style  scoped>

</style>
