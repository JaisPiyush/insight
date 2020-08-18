<template>
    <div class=" overflow-hidden">
        <!-- setting page -->
        <div class="setpannel" v-show="showSettingPage">
            <div class="flex flex-column">
            <div class=" w-12 h-6 mt-4 ml-3">
                <ArrowBack />
            </div>
            <div class=" font-lato  text-xl mt-4 ml-1"> Settings</div>
            </div>
            <!-- <div class="border-b-2 border-gray-400 mt-2"></div> -->
            <div class="px-4 pt-4">
                <div @click="$router.push('/profile.self')" class="h-8 rounded-lg pt-1  font-roboto text-gray-800  mt-1 ">Edit Profile</div>
                <!-- <div class="h-8 rounded-lg pt-1  font-roboto text-gray-800  mt-1 ">Change Password</div> -->
                <div class="h-8 rounded-lg pt-1  font-roboto text-gray-800  mt-1 " @click.prevent="togglePage('about')">About</div>
                <div @click="logout" class="h-8 rounded-lg font-roboto text-blue-400 mt-1 ">Log out</div>
            </div>
        </div>
        <!-- setting page -->

        <!-- about page -->
        <div class="about pannel" v-show="showAboutPage">
            <div class="flex flex-column">
            <div class=" w-12 h-6 text-center mt-3 ml-3" @click.prevent="togglePage('setting')">
                <ArrowBack />
            </div>
            <div class=" font-lato font-bold text-xl ml-4 mt-3"> About</div>
            </div>
            <div class="border-b-2 border-gray-400 mt-2"></div>
            <div class="options flex flex-column justify-around">
                <div v-for="tab in tabs" :key="tab.click">
                     <div v-if="activeIndex === tabs.indexOf(tab)" class="mx-2 px-3 py-2 font-lato font-bold text-xl  text-purple-700">
            {{tab.name}}
            </div>
             <div v-else @click="activeIndex = tabs.indexOf(tab) " class="px-2 py-2 font-muli text-xl ">
            {{tab.name}}
            </div>
                </div>
            </div>
            <div class="aboutpages w-full h-full mt-6 overflow-hidden">
                <div v-show="showAppPage">
                    this is about app page
                </div>
                <div v-show="showCreatorPage">
                    this is creator page
                </div>
            </div>
        </div>
        <!-- about page -->
    </div>
</template>

<script>
import ArrowBack from '@/assets/svg/ArrowBack.vue';
import FrozenStorage from "@/static/js/local_storage.js";
export default {

    data() {
      return {
        currentPage: 'setting',
        defaultP:'abapp',
        tabs: [{'name': 'About App' , 'click': 'About App'},{'name': 'Creator' , 'click': 'Creator'}],
        activeIndex: 0,
      }
    },
    props:
        ['active']
    ,
    components: {
        ArrowBack,
    },
    computed: {
        showAboutPage() {
            return this.currentPage === 'about';
    },
        showSettingPage() {
            return this.currentPage === 'setting';
    },
        showAppPage() {
            return this.defaultP === 'abapp';
    },
        showCreatorPage() {
            return this.defaultP === 'creator';
    }
  },
    methods : {
        togglePage() {
            this.currentPage = this.currentPage === 'setting' ? 'about' : 'setting';
        },
        changestage1() {
            this.defaultP = 'abapp';
        },
        changestage2() {
            this.defaultP = 'creator';
        },
        logout: function(){
          let storage = new FrozenStorage();
          storage.remove('token');
          storage.remove('firtst_name');
          storage.remove('avatar');
          this.$router.push('/auth/login')
        }
  }
}
</script>
<style scoped>
/* .setpannel {
    width: 100%;
    height: 100vh;
    background-color: #f3ec78;
    background-image: linear-gradient(45deg, #4c0ef8,rgb(78, 71, 185), #9e28c2, #960a8f);
} */

.opti {
    width: 70%;
    margin-left: 15%;
    background: rgba(0,0,0,.7);
    border-top-left-radius: 70%;
    border-bottom-right-radius: 70%;
    /* background-image: linear-gradient(45deg, #f8930e,rgb(211, 147, 28), #bfc228, #f3f712); */
}

.abou {
    width: 50%;
    text-align: center;
    color: gray;
    border-bottom: 1px solid rgb(110, 109, 109);

}

.abou:hover{
    width: 50%;
    text-align: center;
    font-weight: bold;
    color: rgb(111, 0, 126);
    border-bottom: 2px solid  rgb(93, 93, 93);

}
</style>
