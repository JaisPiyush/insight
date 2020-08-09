<template>
  <div v-if="this.active" class="w-full h-full">
    <video controls src="" class="w-full h-full" style="height:49vh;" />
  </div>
</template>

<script>
export default {
  props: ['active', 'src'],
  mounted() {
    this.$nextTick().then(() => {
        let videoPlayer = this.$el.querySelector('video');
        this.fetchAsset({type:'video', src:this.src},videoPlayer).then(() => {
            this.$emit('state',{loading:false, error:false});
        }).catch(err=>{
            this.$emit('state',{loading:false, error:true});
        });
    })
  },
  methods: {
    fetchAsset: function(payload,el) {
      return new Promise((resolve, reject) => {
        if (payload.type != 'text') {
          el.src = payload.src
          el.onload = resolve
          el.onerror = reject
        }
      })
    }
  }
}
</script>
