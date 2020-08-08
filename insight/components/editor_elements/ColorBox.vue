<template>
    <div class="w-16 h-20 border border-gray-500" @click="$emit('color-selected', color)"></div>
</template>

<script>
export default {
    props:['color'],
    mounted(){
        this.$el.style.setProperty('background-color',this.color);
    }
}
</script>