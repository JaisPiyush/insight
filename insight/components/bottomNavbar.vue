<template>
<div class="flex justify-center">
    <footer class="footer fixed-bottom sticky-bottom">              
            <div class="container  box-shadow-2xl: rbga(0,0,0,.05)">
                <ul class="flex justify-around">
                
                 
                      <a class="inline-block px-1 py-1" href="#">
                          <img src="@/assets/svg/home.svg" width="24px" height="24px" />
                      </a>                  
                  
                      <a class="inline-block px-1 py-1" href="#">
                          <img src="@/assets/svg/compass.svg" width="24px" height="24px" />
                      </a>
                 
                      <a class="inline-block  px-1 py-1" href="#">
                          <img src="@/assets/svg/plus.svg" width="24px" height="24px"/>
                      </a>
                  
                      <a class="inline-block  px-1 py-1" href="#">
                          <img src="@/assets/svg/notification.svg" width="24px" height="24px"/>
                      </a>
                      <a class="inline-block px-1 py-1" href="#">
                          <img src="@/assets/svg/gear.svg" width="24px" height="24px"/>
                      </a>
                  
                </ul>
            </div>  
    </footer>
</div>
    
</template>


<style scoped>
footer {
    padding-bottom: 0.5rem;
    position: fixed;
    background-color: rgb(250, 250, 250);
    color:#fff;
    background: #eeeeee;
    z-index: 1;
    border-top-left-radius: 0.15rem;
    border-top-right-radius: 0.15rem;
    overflow: hidden;
    bottom: 0;   
    display: flex;
    flex-direction:row; 
    width: 100%;
    opacity: 1;
    

}
.container{
    padding-top: 0.1em;
}



</style>