<template>
<div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div>
        <h1 class="text-2xl text-left ml-4 mt-1 text-bold font-lato"> Discover </h1>
        <a href="#"><img src="@/assets/svg/search.svg" width="24px" height="24px" id="imgs" /></a>
    </div>
   
    <div class="w-full h-auto px-2 py-2 flex overflow-x-scroll overflow-y-hidden justify-between">
        
        <ul class="flex justify-between mt-1">
            <li class="mr-3">
                <a class="inline-block border border-yellow-500 focus:border-none focus:bg-yellow-200 rounded-full py-1 px-6 focus:text-gray-500 text-gray-500" href="#">All</a>
            </li>
            <li class="mr-3">
                <a class="inline-block border border-yellow-500 focus:border-none focus:bg-yellow-200 rounded-full py-1 px-6 focus:text-gray-500 text-gray-500" href="#">Sports</a>
            </li>
            <li class="mr-3">
                <a class="inline-block border border-yellow-500 focus:border-none focus:bg-yellow-200 rounded-full py-1 px-6 focus:text-gray-500 text-gray-500" href="#">Art</a>
            </li>
        </ul>
    </div>
    <bottomNavbar />
</div>
</template>



<script>
import bottomNavbar from '@/components/bottomNavbar.vue';
export default {
    layout: ({
        isMobile
    })=>isMobile ?"mobile":"default",
  
    components: {
        bottomNavbar,
    }
}
</script>

<style scoped>
    #imgs {
  position: absolute;
  
  top: 0;
  right: 0;
  margin-top:1rem ;
  margin-right: 1rem;
    }
</style>