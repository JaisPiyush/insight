<template>
    <div class="w-auto h-auto m-1">
        <div v-if="this.active" class="w-4 h-4 rounded-full bg-green-400"></div>
        <div v-else class="w-4 h-4 rounded-full border border-gray-600 bg-gray-200"></div>
    </div>
</template>

<script>
export default {
    props:['active']
}
</script>

