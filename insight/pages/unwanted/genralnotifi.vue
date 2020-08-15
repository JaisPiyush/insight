<template>
    <div class="box1">
      <div class="general-notf flex">
        <div class="notf-details flex flex-column">
          <h1 class="pl-4"><span class="font-bold">Post on Art</span><br>has been ranked 12 this week</h1>
        </div>
        <div class="time-updt"><h1>13h</h1></div>
      </div>
    </div>
</template>

<style scoped>
.box1 {
  width: 100%;
  height: 4rem;
  overflow: hidden;
  margin-top: 0rem;
  position: relative;
  
  
}

.general-notf {
  width: 100%;
  height: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  position: absolute;
  background-color: rgb(248, 242, 185);

}

.notf-details {
  width: 85%;
  height: 4rem;
  position: absolute;
  color: rgb(185, 117, 28);

}

.time-updt {
  width: 15%;
  height: 2rem;
  margin-top: 1rem;
  margin-left: 85%;
  text-align: center;
  color: rgb(185, 117, 28);
}

</style>