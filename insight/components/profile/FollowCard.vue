<template>
    <div @click="$router.push(`/profile/${account.account_id}`)" class="w-full h-16  py-2 flex bg-white my-2 px-2 rounded-lg shadow-md">
        <img class="w-12 h-12 rounded-full" :src="defav" />
        <div class="w-auto h-full flex flex-col ml-4">
            <p class="text-base font-muli font-bold ">{{account.username}}</p>
            <p class="text-base font-muli text-gray-700 ">{{account.first_name}} {{account.last_name}}</p>
        </div>
    </div>
</template>

<script>
import {avatarDefault} from '~/static/js/assets'
export default {
    props:['account','unfollow'],
    data(){
       return {
            defav:undefined
       }
    },
    mounted(){
       if(this.account.avatar === undefined){
           this.defav = avatarDefault;
       }else if(this.account.avatar. length < 2){
           this.defav = avatarDefault;
       }else{
           this.defav = this.account.avatar;
       }
    }
}
</script>