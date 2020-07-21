<template>
    <div v-if="this.active" class="origin-top-right absolute right-0 mt-12 w-40 rounded-lg bg-white shadow-lg">
        <div class="w-full h-full flex flex-col py-4 px-2">
            <p class="font-muli text-lg font-normal text-gray-900 p-2">Category</p>
            <p class="font-muli text-lg font-normal text-gray-900 p-2">Category</p>
            <p class="font-muli text-lg font-normal text-gray-900 p-2">Category</p>
            <p class="font-muli text-lg font-normal text-gray-900 p-2">Category</p>
        </div>
    </div>
</template>

<script>
export default {
    props:['active'],
    methods:{

    }
}
</script>