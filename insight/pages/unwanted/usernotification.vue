<template>
    <div class="box1">
      <div class="friends-request flex">
        <div class="notf-img"> <img src="@/assets/svg/user.svg"> </div>
        <div class="notf-details flex flex-column">
          <div class="notf-name font-bold">Prashant Chaurasia</div>
          <div class="notf-action pl-2 text-sm">
            Has been accepted your request
          </div>
        </div>
        <div class="time-updt">13h</div>
      </div>
    </div>
</template>

<style scoped>
.box1 {
  width: 100%;
  height: 6rem;
  overflow: hidden;
  margin-top: 0rem;
  position: relative;
  
  
}

.friends-request {
  width: 95%;
  height: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  position: absolute;

}

.notf-img {
  width: 20%;
  height: 4rem;
  border-radius: 2rem;
  margin-top: .5rem;

}

.notf-details {
  width: 65%;
  height: 6rem;
  position: relative;
}

.notf-name {
  width: 90%;
  height: 2rem;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  margin-left: 5%;
  margin-top: .5rem;
  position: absolute;

}

.notf-action {
  width: 100%;
  height: 3rem;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  margin-left: 0;
  margin-top: 2.7rem;
  position: absolute;

}


.time-updt {
  width: 11%;
  height: 3rem;
  margin-top: 1.5rem;
  margin-left: 1rem;
  text-align: center;
}

</style>