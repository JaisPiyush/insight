<template>
  <div class="w-full h-full flex flex-col">
    <div class="header flex w-full h-16 px-2 pt-4">
      <span @click="$router.go(-1)" class="material-icons">
        keyboard_backspace
      </span>
      <input
        type="text"
        v-model="searchHobby"
        placeholder="Type Hobby"
        @change="searchText"
        class="px-2 py-1 font-lato ml-8 w-64 rounded-md  h-8 focus:outline-none border "
      />
    </div>
    <hr />
    <div class="w-full flex flex-wrap px-2 py-4">
      <div v-for="hobby in searched" :key="searched.indexOf(hobby)">
        <hobby-chip :hobby="hobby" />
      </div>
    </div>
    <hr />
     <div class="w-full flex flex-wrap px-2 py-4">
      <div v-for="hobby in hobby_list" :key="hobby_list.indexOf(hobby)">
        <hobby-chip :hobby="hobby" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HobbyChip from '@/components/post_elements/HobbyChip.vue'
export default {
  components: {
    HobbyChip
  },
  mounted() {
    this.fetchHobbies();
  },
  data() {
    return {
      searchHobby: undefined,
      searched: []
    }
  },
  computed: {
    ...mapState('post/create', ['hobby_list', 'hobbyText'])
  },
  methods: {
    ...mapActions('post/create', ['fetchHobbies']),
    searchText: function() {
      if (this.searchHobby != undefined && this.searchHobby.length > 0) {
        this.searched = this.hobby_list.filter(h=>{
          return h.code_name.indexOf(this.searchHobby.toLowerCase())== 0
        });
        console.log(this.searched);
      }
    }
  }
}
</script>

<style scoped></style>
