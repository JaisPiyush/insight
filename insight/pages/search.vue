<template>
    <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <div class="w-full h-auto px-2 py-2 flex overflow-x-scroll overflow-y-hidden justify-between">
            <input type="text" class="rounded-full bg-gray-300 m-3 px-4 py-2 focus:bg-white  focus:rounded-full w-full" placeholder="Search" />
            <a href="#"><img src="@/assets/svg/search.svg" width="24px" height="24px" id="imgs" /></a>
            <a href="#"><img src="@/assets/svg/filter.svg" width="28px" height="28px" id="imgse" /></a>
        </div>
        <div>
            <ul class="flex justify-around items-center">
            
            <li class="ml-4 px-5">
                <a class="inline-block border border-yellow-500 rounded-full focus:border-none focus:bg-yellow-200 focus:text-gray-900 text-gray-500 py-1 px-6" href="#">Posts</a>
            </li>
            <li class="mr-5 px-5">
                <a class="inline-block border border-yellow-500 rounded-full focus:border-none focus:bg-yellow-200 focus:text-gray-900 text-gray-500 py-1 px-6" href="#">People</a>
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
    margin-top:1.5rem ;
    margin-right: 4.5rem;
}
    #imgse {
    position: absolute;
    
    top: 0;
    right: 0;
    margin-top:1.5rem ;
    margin-right: 2rem;
}
  
</style>