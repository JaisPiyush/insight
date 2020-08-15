<template>
    <div @click="onClick" class="w-auto h-auto px-4 py-2 rounded-full bg-gray-400">
        <p class="font-montserrat text-base text-white font-semibold">{{name}},{{city}}</p>
    </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
    props:['name','city','index'],
    methods:{
        ...mapActions("profile/profile",['setPlacesEdit']),
        onClick: function(){
           this.setPlacesEdit({name:this.name, city: this.city, index: this.index});
        }
    }
}
</script>