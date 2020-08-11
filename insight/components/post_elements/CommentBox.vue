<template>
    <div v-if="this.active" class="w-full h-full relative">
        <div class="w-full absolute bg-green-600" style="height:90%;"></div>
        <div class="w-full absolute bg-red-600 flex" style="height:10%;">
            <input type="text" class="py-2 px-2 rounded-full text-white" />
            <button class="bg-purple-600">send</button>
        </div>
    </div>
</template>

<script>
export default {
    props:['active']
}
</script>

<style scoped>

</style>