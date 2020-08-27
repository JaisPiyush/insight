<template>
  <div class="w-full h-full flex flex-col py-2 overflow-hidden bg-gray-200" style="min-height:100vh;">
    <!-- Header -->
    <div class="w-full h-16 pt-2 flex">
      <span @click="$router.go(-1)" class="material-icons text-2xl">keyboard_arrow_left</span>
     <div class="w-full h-full flex justify-center">
        <p class="font-muli text-lg font-bold text-green-400">Followings</p>
     </div>
    </div>
    <div class="w-full h-auto overflow-y-scroll flex flex-col px-2">
      <div v-for="follower in followings" :key="follower.account_id">
        <follow-card :account="follower" :unfollow="true" />
      </div>
    </div>
  </div>
</template>

<script>
import FollowCard from '@/components/profile/FollowCard.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    FollowCard
  },
  data() {
    return {}
  },
  mounted() {
    this.fetchFollows("followings");
    // this.avatar = this.account.avatar;
    // this.usename = this.account.username;
  },
  computed:{
    ...mapState("profile/follows",["followings","loading"]),
  },
  methods:{
    ...mapActions("profile/follows",["fetchFollows"]),
  }
}
</script>
