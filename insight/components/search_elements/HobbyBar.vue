<template>
    <div @click="clicked" :id="code_name" class="w-full h-auto px-4 py-4 flex bg-white rounded-md shadow-md my-2">
        <p class="text-lg font-muli text-black">{{name}}</p>
    </div>
</template>

<script>
export default {
    props:['name','codeName'],
    methods:{
        clicked: function(){
            // Implement Click Action
        }
    }
}
</script>