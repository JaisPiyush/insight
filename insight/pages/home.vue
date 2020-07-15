<template>
  <div id="home" class="w-full overflow-hidden h-screen gradient">
    
    <!-- Header -->
    <div class="w-full h-full flex px-4 py-4">
      <img class="w-16 h-16 my-4 circle" v-lazy="require('@/assets/test/avatar.jpg')" />
      <div v-if="this.firstName != null" class="flex flex-col justify-around mx-4 py-2">
        <p class="font-muli text-gray-500 text-xl">Welcome</p>
        <p class="font-lato font-bold text-blue-800 text-3xl">
          {{ firstName }}!
        </p>
      </div>
      <div v-else class="inline-block w-auto h-full px-4 py-6">
          <p class="font-lato font-bold text-blue-800 text-3xl">
          Welcome!
        </p>
      </div>
      <div class="w-full h-full py-6 flex flex-row-reverse">
        <button class="px-2 py-2 bg-gray-300 h-10 w-10 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="136pt"
            version="1.1"
            viewBox="-1 0 136 136.21852"
            width="136pt"
            class="w-6 h-6"
          >
            <g id="surface1">
              <path
                d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 "
                style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
    <!-- Header End -->

    <!-- Body -->
    <div class="flex flex-col px-3 pt-2 overflow-x-hidden overflow-x-scroll"></div>
    <!-- Body End -->

    <!-- Footer --->
    <div>
        <BottomBar />
    </div>
    <!-- Footer End -->
  </div>
</template>

<script>
import BottomBar from "@/components/BottomBar.vue";
export default {
  components:{
      BottomBar
  },
  data() {
    return {
      firstName: null
    }
  }
}
</script>

<style scoped>
.gradient {
  background: linear-gradient(26.57deg, #edf5fe 12.14%, #ffffff 92.86%);
}

#home {
  display: grid;
  grid-template-rows: 15% 77% 8%;
}
.circle {
  border-radius: 50%;
}
</style>
