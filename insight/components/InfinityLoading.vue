<template>
  <div v-if="this.active" class="w-full bg-white flex flex-col justify-center" style="min-height:40vh;">
    <div class="w-full h-16 flex justify-center">
        <img  src="@/assets/loading.gif" class="w-12 h-12" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['active']
}
</script>
