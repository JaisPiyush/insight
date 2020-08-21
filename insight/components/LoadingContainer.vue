<template>
  <div class="w-screen h-full bg-transparent">
    <div v-if="this.loading" class="loader-parent flex flex-col">
      <!-- <breeding-rhombus-spinner :animation-duration="2000" :size="65" color="#ff1d5e"/> -->
      <div class="breeding-rhombus-spinner mx-auto">
        <div class="rhombus child-1"></div>
        <div class="rhombus child-2"></div>
        <div class="rhombus child-3"></div>
        <div class="rhombus child-4"></div>
        <div class="rhombus child-5"></div>
        <div class="rhombus child-6"></div>
        <div class="rhombus child-7"></div>
        <div class="rhombus child-8"></div>
        <div class="rhombus big"></div>
      </div>
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

.breeding-rhombus-spinner {
      height: 5rem;
      width: 5rem;
      position: relative;
      transform: rotate(45deg);
    }

    .breeding-rhombus-spinner, .breeding-rhombus-spinner * {
      box-sizing: border-box;
    }

    .breeding-rhombus-spinner .rhombus {
      height: calc(4rem / 7.5);
      width: calc(4rem / 7.5);
      border-radius: 50%;
      animation-duration: 2000ms;
      top: calc(4rem / 2.3077);
      left: calc(4rem / 2.3077);
      position: absolute;
      animation-iteration-count: infinite;
    }

    .breeding-rhombus-spinner .rhombus:nth-child(2n+0) {
       margin-right: 0;
     }

    .breeding-rhombus-spinner .rhombus.child-1 {
      animation-name: breeding-rhombus-spinner-animation-child-1;
      animation-delay: calc(100ms * 1);
      background-color: #da5c82;
    }

    .breeding-rhombus-spinner .rhombus.child-2 {
      animation-name: breeding-rhombus-spinner-animation-child-2;
      animation-delay: calc(100ms * 2);
      background-color: #da5cbf;
    }

    .breeding-rhombus-spinner .rhombus.child-3 {
      animation-name: breeding-rhombus-spinner-animation-child-3;
      animation-delay: calc(100ms * 3);
      background-color: #885cda;
    }

    .breeding-rhombus-spinner .rhombus.child-4 {
      animation-name: breeding-rhombus-spinner-animation-child-4;
      animation-delay: calc(100ms * 4);
      background-color: #5cd6da;
    }

    .breeding-rhombus-spinner .rhombus.child-5 {
      animation-name: breeding-rhombus-spinner-animation-child-5;
      animation-delay: calc(100ms * 5);
      background-color: #5cdaa6;
    }

    .breeding-rhombus-spinner .rhombus.child-6 {
      animation-name: breeding-rhombus-spinner-animation-child-6;
      animation-delay: calc(100ms * 6);
      background-color: #8eda5c;
    }

    .breeding-rhombus-spinner .rhombus.child-7 {
      animation-name: breeding-rhombus-spinner-animation-child-7;
      animation-delay: calc(100ms * 7);
      background-color: #dac35c;
    }

    .breeding-rhombus-spinner .rhombus.child-8 {
      animation-name: breeding-rhombus-spinner-animation-child-8;
      animation-delay: calc(100ms * 8);
      background-color: #da9f5c;
    }

    .breeding-rhombus-spinner .rhombus.big {
      height: calc(4rem / 3);
      width: calc(4rem / 3);
      border-radius: 50%;
      animation-duration: 2000ms;
      background-color: #84da5c;
      top: calc(4rem / 3);
      left: calc(4rem / 3);
      animation: breeding-rhombus-spinner-animation-child-big 2s infinite;
      animation-delay: .5s;
    }


    @keyframes breeding-rhombus-spinner-animation-child-1 {
      50% {
        transform: translate(-225%, -225%);
      }
    }

    @keyframes breeding-rhombus-spinner-animation-child-2 {
      50% {
        transform: translate(0, -325%);
      }
    }

    @keyframes breeding-rhombus-spinner-animation-child-3 {
      50% {
        transform: translate(225%, -225%);
      }
    }

    @keyframes breeding-rhombus-spinner-animation-child-4 {
      50% {
        transform: translate(325%, 0);
      }
    }

    @keyframes breeding-rhombus-spinner-animation-child-5 {
      50% {
        transform: translate(225%, 225%);
      }
    }

    @keyframes breeding-rhombus-spinner-animation-child-6 {
      50% {
        transform: translate(0, 325%);
      }
    }

    @keyframes breeding-rhombus-spinner-animation-child-7 {
      50% {
        transform: translate(-225%, 225%);
      }
    }

    @keyframes breeding-rhombus-spinner-animation-child-8 {
      50% {
        transform: translate(-325%, 0);
      }
    }

    @keyframes breeding-rhombus-spinner-animation-child-big {
      20% {
        transform: scale(0.4);
        background-color: #da5caa;
      }
      40% {
        transform: scale(0.6);
        background-color: #975cda;
      }
      60% {
        transform: scale(0.4);
        background-color: #5c73da;
      }
      70% {
        transform: scale(0.6);
        background-color: #5cdabf;
      }
    }
</style>
