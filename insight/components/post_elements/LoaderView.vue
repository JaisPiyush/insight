<template>
  <div class="w-full h-full bg-transparent relative">
    <div v-if="this.loading" class="loader-parent flex flex-col absolute z-10">
        <div class="loader"></div>
        <p class="mt-6 font-lato text-gray-500 text-xl font-semibold mx-auto">
          {{text == undefined ? 'Hold on we are loading!' : text}}
        </p>
    </div>
    <div class="w-full h-full absolute z-0" :style="`${this.loading}? 'display:hidden;':''`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading' ,'text'],
  mounted(){
    console.log(this.loading)
  }
}
</script>

<style scoped>
.loader-parent{
    padding-top: 45%;
}
.loader {
  margin: auto auto;
  height: 4.5rem;
  width: 4.5rem;
  box-sizing: border-box;
  display: flex;
  position: relative;
  justify-content: center;
  perspective-origin: 1.8rem 1.8rem;
  transform-origin: 1.8rem 1.8rem;
  border: 0px solid rgb(0, 0, 0);
  flex: 0 0 auto;
  flex-flow: column nowrap;
}
.loader:after,
.loader:before {
  height:5.5rem;
  width:5.5rem;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.225rem;
  box-sizing: border-box;
  content: '';
  left: 0;
  position: absolute;
  top: 0;
}
.loader:after {
  -webkit-animation: rotate 2s infinite ease;
  animation: rotate 2s infinite ease;
  border-color: #5F0A87 transparent transparent;
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
}
.loader:before {
  border-color: #c7c7c7;
}

@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
