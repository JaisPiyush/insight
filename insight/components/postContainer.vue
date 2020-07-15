<template>
<div class="w-full">
    <div class="rounded-lg bg-gray-200 overflow-x-hidden overflow-y-hidden m-4" id="container">
                <div class="p-3">
                    <img src="@/assets/svg/user.svg" width="24px" height="24px" class="object-left-top ml-1 mt-2 inline-block absolute" />
                    <h1 class="inline-block ml-10 p-1 m-2">Suyash Maddhessiya</h1>
                    <button class="inline-block rounded-full mr-6 mt-2 text-blue-900 border-2 px-3 py-1 text-sm" id="follow">Follow</button>
                    <div>
                    <p id="description" class="m-2">
                        If we are developing for a WebKit browser, we can add a few WebKit proprietary CSS properties to add multiline ellipses easily. Multiline ellipses open another topic for discussion, but in my case, I was developing for a WebKit browser (iOS), and I benefitted from the simple addition.
                    </p>
                    </div>
                </div>
            </div>
    <div class="rounded-sm bg-gray-200 overflow-x-hidden overflow-y-hidden m-4" id="container">
                <div class="p-3">
                    <img src="@/assets/svg/user.svg" width="24px" height="24px" class="object-left-top ml-1 mt-2 inline-block absolute" />
                    <h1 class="inline-block ml-10 p-1 m-2">Prashant Chaurshiya</h1>
                    <button class="inline-block rounded-full mr-6 mt-2 text-blue-900 border-2 px-3 py-1 text-sm" id="follow">Follow</button>
                    <p id="description" class="m-2">
                        If we are developing for a WebKit browser, we can add a few WebKit proprietary CSS properties to add multiline ellipses easily. Multiline ellipses open another topic for discussion, but in my case, I was developing for a WebKit browser (iOS), and I benefitted from the simple addition.
                    </p>
                    <div>
                        <mplayer />
                    </div>
                </div>
            </div>
    
</div>
</template>

<style scoped>


#follow{
    position: absolute;
    right: 0;
}
#id{
    position: absolute;
    left: 0;
}

</style>

<script>
 import mplayer from '@/components/mplayer.vue';

export default {
    components: {
        mplayer,
    }
}  
</script>