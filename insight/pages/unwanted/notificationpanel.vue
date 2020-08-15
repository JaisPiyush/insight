<template>
    <div class="box1">
      <div class="collections flex">
        <hr>
        <div class="colls font-bold"> <a href="#" >Notification</a></div>
        <div class="colls font-bold "><a href="#" >Leaderboard</a></div>
      </div>
    </div>
</template>

<style scoped>
.box1 {
  width: 100%;
  height: 3rem;
  overflow: hidden;
  margin-top: 0;
  position: relative;
}

.collections {
  width: 95%;
  height: 2rem;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  margin-top:1rem;
  text-align: center;
  position: absolute;
}

.colls {
  width: 50%;
  height: 2rem;
  color: gray;
  border-bottom: .1rem solid gray;
}

.colls:hover {
  color: rgb(192, 78, 207);
  border-bottom: .1rem solid rgb(192, 78, 207);
}

.request-notf {
  width: 95%;
  height: 6rem;
  color: rgb(37, 37, 37);
}

</style>