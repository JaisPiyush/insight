<template>
  <div class="w-auto h-auto px-4 py-2 rounded-full bg-pink-600" @click="$emit('click',hobby)" >
    <p class="font-muli text-bold text-white text-lg">{{hobby.name}}</p>
  </div>    
</template>

<script>
export default {
    props: ['hobby'],
}
</script>
