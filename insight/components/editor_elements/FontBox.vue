<template>
  <div
    class="w-20 h-20 border border-gray-300 px-2 py-2"
    @click="$emit('font-selected', font)"
  >
    <p class="text-base">Hey love!</p>
  </div>
</template>

<script>
export default {
  props: ['font', 'bgColor', 'txtColor'],
  mounted(){
      this.patchChanges();
  },
  updated() {
      this.patchChanges();
  },
  methods: {
    patchChanges: function() {
      this.$el.style.setProperty('font-family', this.font)
      this.$el.style.setProperty('color', this.txtColor)
      this.$el.style.setProperty('background-color', this.bgColor)
    }
  }
}
</script>
