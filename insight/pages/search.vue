<template>
  <div
    class="w-full h-screen overflow-hidden flex flex-col"
    id="search"
    style="min-height:100vh;"
  >
    <div class="block w-full h-auto py-2 px-4">
      <div
        class="h-10 w-full py-1 px-2 focus:outline-none rounded-full flex shadow-lg bg-gray-200"
      >
        <input
          class="py-2 w-full h-8 px-2 focus:outline-none rounded-full font-muli text-sm text-black bg-gray-200"
          style="caret-color:white;"
          v-model="searchText"
          placeholder="Search"
        />
        <span class="material-icons stroke-current text-black mr-2 mt-1">
          search
        </span>
      </div>
    </div>
    <div
      class="bg-gray-200 w-full h-full overflow-x-auto overflow-y-scroll px-4"
    >
      <div v-for="tag in tags" :key="tag">
        <tag-bar :name="tag" />
      </div>
      <div v-for="hobby in hobbies" :key="hobby.code_name">
        <hobby-bar :name="hobby.name" :codeName="hobby.code_name" />
      </div>

      <div v-for="account in accounts" :key="account.account_id">
        <account-bar :account="account" />
      </div>
    </div>
  </div>
</template>

<script>
import TagBar from '@/components/search_elements/TagBar.vue'
import HobbyBar from '@/components/search_elements/HobbyBar.vue'
import AccountBar from '@/components/search_elements/AccountBar.vue'
import {mapState, mapActions} from "vuex";
export default {
  components: {
    TagBar,
    HobbyBar,
    AccountBar
  },
  data() {
    return {
      tabs: [
        { name: 'People', click: 'people' },
        { name: 'Post', click: 'post' }
      ],
      activeIndex: 0,
      dropActive: false,
      searchText: undefined
    }
  },
  computed:{
    ...mapState("search",["tag","hobbies","accounts"])
  }
}
</script>

<style scoped>
/* #search {
  display: grid;
  grid-template-rows: 15% 75% 9%;
} */
</style>
