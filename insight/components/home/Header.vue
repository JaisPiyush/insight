<template>
  <div class="w-full flex flex-col">
    
    <!-- First Header -->
    <div v-if="this.active" class="w-full h-16 flex px-2 py-2">
      <img
        @click="$emit('navigate')"
        :src="avatar"
        class="w-12 h-12 rounded-full"
      />
      <div class="w-auto ml-4 mt-2 h-full flex flex-col justify-center">
        <p @click="navigateToSelf" class="font-lato font-semibold text-2xl">
          {{ firstName }}
        </p>
      </div>
    </div>

    <!-- Second Header -->
  </div>
</template>

<script>
export default {
  props: ['active', 'avatar', 'firstname']
}
</script>

<style></style>
