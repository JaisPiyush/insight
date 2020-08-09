<template>
  <div class="w-full h-full">
    <img src="" class="w-full h-full" />
  </div>
</template>
<script>
export default {
  props: ['active', 'src'],
  mounted() {
      let self = this;
      this.$nextTick().then(()=>{
          let image = self.$el.querySelector('img');
          self.fetchAsset({type:'image', src:self.src},image).then(()=>{
              console.log('working')
              self.$emit('state',{loading:false, error:false});
              console.log('meta-working')
          }).catch((err)=>{
              self.$emit('state',{laoding:false, error:true});
          });
      });
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
