<template>
  <div @click="invokeInput" class="w-16 h-16 px-4 py-4 rounded-md" style="background-color: #26252c;">
      <slot ></slot>
       <input type="file"
            :accept="`${filetype}/*`"
            class="display-none"
            :multiple="multiple"
            @change="changeObserver"
          />
  </div>
</template>

<script>
export default {
    props:['filetype','multiple'],
    methods:{
        invokeInput: function(){
            // OnClicking slot, the hidden input tag will be called
            this.$el.querySelector('input').click();
        },
        changeObserver: function(){
            this.$emit('pick',{files:this.$el.querySelector('input').files, type:this.filetype});
        }
    }
}
</script>

<style scoped>
.display-none {
  display: none;
}

</style>