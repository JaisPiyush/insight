<template>
    <div>
         <bottomNavbar />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <div class="overflow-x-hidden  overflow-y-auto">
            <div class="text-2xl text-center bg-gray-200 m-0">
                <h1 class="p-2" id="grd">Insight </h1>
            </div>

            
        <postContainer />
        </div>
       
    </div>
     
</template>

<script>
import bottomNavbar from '@/components/bottomNavbar.vue';
import postContainer from '@/components/postContainer.vue';

export default {
    components: {
        bottomNavbar,
        postContainer,
    }
}
</script>

<style scoped>

#grd{
    background: -webkit-linear-gradient(#D65BCA, #21D190);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}



</style>
