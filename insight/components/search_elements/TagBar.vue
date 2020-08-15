<template>
    <div @click="clicked" class="w-full h-auto px-4 py-3 flex bg-white rounded-md shadow-md my-2">
        <p class="text-lg font-montserrat font-bold italic text-blue-600">{{name}}</p>
    </div>
</template>

<script>
export default {
    props:['name'],
    methods:{
        clicked: function(){
            // Implement Click Action
        }
    }
}
</script>