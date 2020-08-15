<template>
    <div class="w-full h-screen overflow-hidden">
    <div class="flex flex-col w-full h-full py-2 px-4">
        <h1 class="font-lato text-gray-700 font-bold text-2xl m-1 p-1">Change Password...</h1>
        <div class="h-10 w-full py-1 px-2 bg-gray-200 mt-2 focus:outline-none rounded-lg flex">
        <input
          class="py-2 w-full h-8 px-2 focus:outline-none bg-gray-200 font-muli text-sm"
          placeholder="Enter Old Password" type="password"
        />
      </div>
      <div class="h-10 w-full py-1 px-2 bg-gray-200 mt-3 focus:outline-none rounded-lg flex">
        <input
          class="py-2 w-full h-8 px-2 focus:outline-none bg-gray-200 font-muli text-sm"
          placeholder="Enter new password" v-model="password" type="password"
        />
      </div>
      <div class="h-10 w-full py-1 px-2 bg-gray-200 mt-2 focus:outline-none rounded-lg flex">
        <input
          class="py-2 w-full h-8 px-2 focus:outline-none bg-gray-200 font-muli text-sm"
          placeholder="Confirm password" v-model="confirm_Password" @input="matchPassword(undefined)" type="password"
        />
      </div>
      <div>
        <nuxt-link to="#"><button  class="rounded-lg px-3 py-1 ml-5 mt-3 left-0 bg-gray-200 outline-none focus:bg-gray-400 text-gray-700 font-bold">Cancel</button></nuxt-link>
          
          <nuxt-link to="#"><button id="otp" class="rounded-lg px-3 py-1 mr-5 mt-3 right-0 bg-green-200 outline-none focus:bg-green-400 text-gray-700 font-bold">Confirm</button></nuxt-link>
      </div>
    </div>
    </div>
</template>

<style scoped>
#otp{
    position: absolute;
    right: 0;
}
</style>

<script>
export default {
  data(){
    return{
      password: undefined,
      confirm_Password: undefined,
    }
  },
  methods: {
    confirmClick: function(){
      if(this.password != undefined
      && this.password != '' &&
      this.confirm_Password != undefined &&
      this.confirm_Password != ''
      ){
        this.matchPassword(() => {
          this.password = undefined,
          this.confirm_Password = undefined
        }

        )
      }
    },
    matchPassword: function(func) {
      let passwordField = document.getElementById('password-field')
      if (
        this.password != this.confirm_Password ||
        this.password === '' ||
        this.confirm_Password === ''
      ) {
        passwordField.style.setProperty('border-color', '#f56565')
        if (func != undefined) {
          func()
        }
      } else {
        passwordField.style.setProperty('border-color', '#cbd5e0')
      }
    },
  }
}
</script>