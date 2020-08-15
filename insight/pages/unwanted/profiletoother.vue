<template>
  <div class="profmain">
    <bottomNavbar />
    <div class="box1">

      <div class="profile-box1">
        <img src="@/assets/svg/user.svg" class="profile-img">
      </div>
      <div class="bio">
        <div class="username font-bold">Prashant Kumar Chaurasia</div>
        <div class="text-blue-500 text-center pt-2">@prashant5683</div>
        <div class="user-info text-sm">
          <h1>Alone but Happy, My life My rules, passionated about my work. eager to fullfill my dreams</h1>
        </div>
      </div>
      <div class="follower">
        <h1 class="fow-fol"><span class="text-green-500">Followers</span><br ><span class="text-base">13k</span></h1>
      </div>
      <div class="following">
        <h1 class="fow-fol"><span class="text-green-500">Following</span><br><span class="text-base">10</span></h1>         
      </div>
      <div class="foll-msg flex">
        <hr>
        <div class="follow rounded-lg"> <a href="#" class="font-bold">Follow</a></div>
        <div class="follow rounded-lg"><a href="#" class="font-bold">Message</a></div>
      </div>
      <div class="hobbies flex flex-wrap ">
        <div class="hob-item"> Photography</div>
        <div class="hob-item">Art</div>
        <div class="hob-item">Dance</div>
        <div class="hob-item">Memes</div>
        <div class="add-item">+</div>
      </div>
      <div class="collections flex">
        <hr>
        <div class="colls font-bold"> <a href="#" >Collections</a></div>
        <div class="colls font-bold "><a href="#" >Leaderboard</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {  
    components: {
        
    }
}
</script>

<style scoped>
.profmain {
  width: 100%;
  height: 100vh;
  position: relative;

}

.box1 {
  width: 100%;
  height: 35rem;
  overflow: hidden;
  margin-top: 0;
  position: relative;
  background: rgb(255, 255, 255);
  box-shadow: 0px 3px 8px #888888;
}

.profile-box1 {
    width: 7rem;
    height: 7rem;
    border-radius: 3.5rem;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    margin-top: 2rem;
    position: absolute;
}


.profile-img {
  width: 100%;
  height: 100%;
  background-position: center;

}

.bio {
  width: 90%;
  height: 10rem;
  background-color: rgb(255, 255, 255);
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  margin-top:10rem;
  position: relative;
}

.username {
  width: 90%;
  height: 1.5rem;
  color: black;
  font-family: 'lato' ,sans-serif;
  font-size: 1.3rem;
  text-align: center;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
}

.user-info {
  width: 90%;
  color: rgb(105, 103, 105);
  font-family: 'lato' ,sans-serif;
  text-align: center;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  margin-top: .5rem;
  overflow: hidden;
}

.follower {
    width: 5rem;
    height: 5rem;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    margin-top:3rem;
    margin-left: .8rem;
    position: absolute;
    background: white;


}

.following {
    width: 5rem;
    height: 5rem;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    margin-top: 3rem;
    margin-right: .8rem;
    position: absolute;
    background: white;


}

.fow-fol {
  display: block;
  font-family: 'Nunito',sans-serif;
  text-align: center;
  font-size: small;
  padding-top: 1.5rem;
}

.foll-msg {
  width: 80%;
  height: 2rem;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  margin-top:19rem;
  position: absolute;
}

.follow {
  width: 40%;
  height: 2rem;
  margin-left: 5%;
  margin-right:5%;
  border: .01rem solid rgb(0, 0, 0);
}

.follow:hover {
  background-color: rgb(67, 177, 76);
  color: white;
}

.hobbies {
  width: 90%;
  height: 5rem;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  margin-top:23rem;
  position: absolute;
  overflow: hidden;
}

.hob-item {
  height: 1.8rem;
  border: 0.2px solid green;
  color: green;
  margin-right: .5rem;
  padding-right: .5rem;
  padding-left: .5rem;
  border-radius: 1rem;
}
.add-item {
  height: 1.8rem;
  border: 0.2px solid rgb(56, 7, 134);
  color: rgb(56, 7, 134);
  margin-right: .5rem;
  padding-right: .5rem;
  padding-left: .5rem;
  border-radius: 1rem;
}


a {
  display: block;
  font-family: 'Nunito',sans-serif;
  text-align: center;
  padding-top: .2rem;
}


.collections {
  width: 98%;
  height: 2rem;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  margin-top:29rem;
  position: absolute;
}

.colls {
  width: 50%;
  height: 2rem;
  color: gray;
  border-bottom: .1rem solid gray;
  margin-left: .2rem;
}

.colls:hover {
  color: rgb(79, 172, 79);
  border-bottom: .1rem solid rgb(79, 172, 79);
}

</style>