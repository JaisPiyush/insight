<template>
    <div class="w-full h-screen overflow-hidden">
        
    <div class="flex flex-col w-full h-full py-2 px-4">
      <div class="h-10 w-full py-1 px-2 bg-gray-200 mt-6 focus:outline-none rounded-lg flex">
        <input type='number' min="6" max="6"
          class="py-2 w-full h-8 px-2 focus:outline-none bg-gray-200 font-muli text-sm"
          placeholder="Enter OTP"
        />
      </div>
      <div>
          <button @click="$router.push('/forgetpass')" class="rounded-lg px-3 py-1 mt-3 left-0 mx-5 bg-gray-200 absolute outline-none focus:bg-gray-400">Back</button>
          <button id="otp" @click="$router.push('/newPass')" class="rounded-lg px-3 py-1 mr-5 mt-3 right-0 bg-green-200 outline-none focus:bg-green-400 text-gray-700 font-bold">Confirm</button>

      </div>
    </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#otp{
    position: absolute;
    right: 0;
}
</style>