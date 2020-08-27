<template>
 <client-only>
  <div class="fixed bg-white flex flex-row justify-around w-full h-10 py-2 bg-white">
      <div>
          <span class="material-icons">home</span>
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
