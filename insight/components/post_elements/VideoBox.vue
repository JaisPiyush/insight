<template>
  <div v-if="this.active" class="w-full h-auto">
    <video controls :src="src" @load="$emit('state',{loading:false, error:false})" @error="$emit('state',{loading:false, error:true})" class="w-full h-auto m-auto" style="height:49vh;" />
  </div>
</template>

<script>
export default {
  props: ['active', 'src'],
  mounted() {
    let self = this;
    this.$nextTick().then(() => {
        let videoPlayer = self.$el.querySelector('video');
        // self.fetchAsset({type:'video', src:self.src},videoPlayer).then(() => {
        //     self.$emit('state',{loading:false, error:false});
        // }).catch(err=>{
        //     self.$emit('state',{loading:false, error:true});
        // });
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
