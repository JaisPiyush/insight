<template>
  <div class="w-full h-screen overflow-hidden" id="search">
    <div class="flex flex-col w-full h-full py-2 px-4">
      <div class="h-10 w-full py-1 px-2 bg-gray-200 focus:outline-none rounded-full flex">
        <input
          class="py-2 w-full h-8 px-2 focus:outline-none bg-gray-200 font-muli text-sm"
          placeholder="Search"
        />
        <img src="@/assets/svg/search.svg" class="w-4 h-4 my-2 mx-4" />
      </div>
      <div class="flex pr-3 pl-4 justify-between ">
         <div v-for="tab in tabs" :key="tab.click" class="flex justify-around w-full h-full ">
            <div v-if="activeIndex === tabs.indexOf(tab)" class="mx-2 px-2 pt-2 font-muli font-bold text-xl border border-l-0 border-t-0 border-r-0 border-purple-600 border-b-4">
            {{tab.name}}
            </div>
             <div v-else @click="activeIndex = tabs.indexOf(tab) " class="px-2 py-2 font-muli text-xl ">
            {{tab.name}}
            </div>

            </div>
             <img @click="dropActive = !dropActive" src="@/assets/svg/more.svg" class="w-5 h-5 mt-3">
             <dropdown :active="dropActive"/>        
      </div>
    </div>

    <div class="bg-red-100"></div>
    <div>
      <bottomNavbar class="top-0" />
    </div>
  </div>
</template>

<script>
import bottomNavbar from '@/components/bottomNavbar.vue'
import dropdown from '@/components/dropdown.vue'
export default {
  components: {
    bottomNavbar,
    dropdown,
  },
   data(){
        return{
            tabs:[{'name':'People','click':'people'},{'name':'Post','click':'post'}],
            activeIndex:0,
            dropActive:false
        }
    }
}
</script>

<style scoped>
#search {
  display: grid;
  grid-template-rows: 15% 75% 9%;
}
</style>