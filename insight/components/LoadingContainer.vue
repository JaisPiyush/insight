<template>
  <div class="w-screen h-full bg-transparent">
    <div v-if="this.loading" class="loader-parent flex flex-col">
        <div class="loader"></div>
        <p class="mt-6 font-lato text-gray-500 text-xl font-semibold mx-auto">Hold on we are loading!</p>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading']
}
</script>

<style scoped>
.loader-parent{
    padding-top:65%;
}
.loader {
  margin: auto auto;
  height: 7.5rem;
  width: 7.5rem;
  box-sizing: border-box;
  display: flex;
  position: relative;
  justify-content: center;
  perspective-origin: 3.8rem 3.8rem;
  transform-origin: 3.8rem 3.8rem;
  border: 0px solid rgb(0, 0, 0);
  flex: 0 0 auto;
  flex-flow: column nowrap;
}
.loader:after,
.loader:before {
  height: 7.5rem;
  width: 7.5rem;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.125rem;
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
