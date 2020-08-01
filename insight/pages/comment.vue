<template>
    <div class="w-full h-screen overflow-x-hidden overflow-y-hidden">
        <div class="rounded-lg bg-gray-200 overflow-x-hidden m-4 w-auto h-auto justify-between" id="container">
                <div class="p-2">
                    <img src="@/assets/svg/user.svg" class="object-left-top ml-1 mt-2 inline-block absolute w-6 h-6" />
                    <h1 class="inline-block ml-10 p-1 m-1 font-lato font-bold font-lg">Suyash Maddhessiya</h1>
                    <div>
                        <p id="description" class="ml-8 mt-0 font-lato font-semibold font-base">
                            Amazing art
                        </p>
                    </div>
                </div>
                
            </div>
            <div class="w-full py-1 px-2 bg-gray-200 focus:outline-none rounded-lg bottom-0 fixed flex">
                    <input
                    class="py-2 w-full px-2 focus:outline-none bg-gray-200 font-lato font-bold font-lg text-sm"
                    placeholder="Post Comment"
                    />
                    <img src="@/assets/svg/paper-plane.png" class="w-5 h-5 my-2 mx-4" />
                </div>
    </div>
</template>

<script>

export default {
    
}
</script>

<style scoped>

</style>