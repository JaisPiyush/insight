<template>
  <div
    class="w-full h-full py-2 px-2 overflow-x-hidden overflow-y-scroll"
  >
    <p class="wrap-text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ['text', 'fontName', 'fontColor', 'bgColor'],
  mounted(){
      this.$nextTick().then(() => {
          this.$el.style.setProperty('background-color',this.bgColor);
          this.$el.style.setProperty('font-color',this.fontColor);
          this.$el.style.setProperty('font-family',this.fontName);
      })
  }
}
</script>

<style scoped>
.wrap-text {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
