<template>
    <img v-if="this.active" src="@/assets/loading.gif" class="w-full h-full" />
</template>

<script>
export default {
    props: ['active']
}
</script>