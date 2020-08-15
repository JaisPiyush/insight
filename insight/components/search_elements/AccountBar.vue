<template>
  <div
    :id="account.account_id"
    class="w-full h-auto px-2 py-4 bg-white flex rounded-md shadow-md my-2"
  >
    <div class="w-16 h-full">
      <img :src="account.avatar" class="w-12 h-12 rounded-md mt-1" />
    </div>
    <div class="ml-2 w-full h-full flex flex-col">
      <p class="font-muli font-bold text-sm">{{ account.username }}</p>
      <p class="font-lato text-gray-700">
        {{ account.first_name }} {{ account.last_name }}
      </p>
      <div class="w-full h-auto flex mt-1">
        <div v-if="this.account.friend === 1" class="mt-1">
          <p class="font-muli font-bold text-blue-700">Friends</p>
        </div>
        <button v-if="this.account.friend === 0" class="px-4 py-1 font-muli text-white bg-blue-600 rounded-md ">
          + Friend
        </button>
        <div v-if="this.account.following === 1" class="ml-4 mt-1">
          <p class="font-muli font-bold text-green-400">Follows</p>
        </div>
        <button v-if="this.account.following === 0" class="px-4 py-1 ml-4 font-muli text-white bg-green-400 rounded-md ">
          Follow
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['account']
}
</script>
