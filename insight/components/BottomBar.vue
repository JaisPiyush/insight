<template>
 <client-only>
  <div class="flex flex-row justify-around w-full h-full py-2 bg-white fixed bottom-0">
    <!-- Home -->
    <div class="px-2 py-2" @click="$router.push('/home')" >
      <div v-if="this.routeName === 'home' || this.routeName === 'index'">
          <HomeSvg class="w-6 h-6 stroke-current fill-current text-purple-600"/>
      </div>
      <div v-else>
          <HomeSvg class="w-6 h-6" />
      </div>
    </div>

    <!-- Explore -->
    <div class="px-2 py-3" @click="$router.push('/discover')">
        <div v-if="this.routeName === 'explore' ">
          <ExploreSvg class="w-6 h-6 stroke-current fill-current text-purple-600"/>
      </div>
      <div v-else>
          <ExploreSvg class="w-6 h-6" />
      </div>
    </div>

    <!-- Notification -->
    <div class="px-2 py-2" @click="$router.push('/notification')">
        <div v-if="this.routeName === 'notification' ">
          <NotificationSvg class="w-6 h-6 stroke-current fill-current text-purple-600"/>
      </div>
      <div v-else>
          <NotificationSvg class="w-6 h-6" />
      </div>
    </div>

    <!-- Settings -->
    <div class="px-2 py-2" @click="$router.push('/settings')">
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
