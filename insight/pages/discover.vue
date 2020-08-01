<template>
<div class="w-full h-screen flex flex-col">
    <div class="flex flex-row px-4 py-2">
        <h1 class="text-3xl text-left font-bold font-lato"> Discover </h1>
        <div class="w-full h-auto flex flex-row-reverse py-2">
          <nuxt-link to="/search">
          <img src="@/assets/svg/search.svg" class="w-8 h-8 px-2 py-2 bg-gray-300 rounded-md" id="imgs"/>
          </nuxt-link>
        </div>
    </div>
    <div class="flex overflow-y-hidden overflow-x-scroll px-2 py-2">
        <div v-for="tab in tabs" :key="tab.click">
            <div v-if="activeIndex === tabs.indexOf(tab)" class="mx-2 px-3 py-2 font-muli font-bold text-xl border border-l-0 border-t-0 border-r-0 border-purple-600 border-b-4">
            {{tab.name}}
            </div>
             <div v-else @click="activeIndex = tabs.indexOf(tab) " class="px-2 py-4 font-muli text-xl ">
            {{tab.name}}
            </div>           
        </div>
    </div>

    <BottomBar />
</div>
</template>



<script>
import BottomBar from '@/components/BottomBar.vue';
export default {  
    components: {
        BottomBar,
    },
    data(){
        return{
            tabs:[{'name':'All','click':'all'},{'name':'Art','click':'art'},{'name':'Quotes','click':'quotes'}],
            activeIndex:0
        }
    }
}
</script>

<style scoped>
</style>