<template>
 <client-only>
  <div class="flex flex-row justify-around w-full h-full py-2 bg-white">
    <!-- Home -->
    <div class="px-2 py-2" @click="$router.go('/home')" >
      <div v-if="this.routeName === 'home' || this.routeName === 'index'">
          <HomeSvg class="w-6 h-6 stroke-current fill-current text-purple-600"/>
      </div>
      <div v-else>
          <HomeSvg class="w-6 h-6" />
      </div>
    </div>

    <!-- Explore -->
    <div class="px-2 py-3" @click="$router.go('/explore')">
        <div v-if="this.routeName === 'explore' ">
          <ExploreSvg class="w-6 h-6 stroke-current fill-current text-purple-600"/>
      </div>
      <div v-else>
          <ExploreSvg class="w-6 h-6" />
      </div>
    </div>

    <!-- Notification -->
    <div class="px-2 py-2" @click="$router.go('/notification')">
        <div v-if="this.routeName === 'notification' ">
          <NotificationSvg class="w-6 h-6 stroke-current fill-current text-purple-600"/>
      </div>
      <div v-else>
          <NotificationSvg class="w-6 h-6" />
      </div>
    </div>

    <!-- Settings -->
    <div class="px-2 py-2" @click="$router.go('/settings')">
        <div v-if="this.routeName === 'settings' ">
          <SettingsSvg class="w-6 h-6 stroke-current fill-current text-purple-600"/>
      </div>
      <div v-else>
          <SettingsSvg class="w-6 h-6" />
      </div>
    </div>

  </div>
 </client-only>
</template>

<script>
import HomeSvg from "@/assets/svg/HomeSvg.vue";
import ExploreSvg from "@/assets/svg/ExploreSvg";
import NotificationSvg from "@/assets/svg/NotificationSvg.vue";
import SettingsSvg from "@/assets/svg/SettingsSvg.vue";
export default {
    components:{
        HomeSvg,
        ExploreSvg,
        NotificationSvg,
        SettingsSvg,
    },
    data(){
        return{
            routeName: undefined
        }
    },
    updated(){
        this.routeName = this.$route.name;
        console.log(this.routeName);
        
    }
}
</script>
