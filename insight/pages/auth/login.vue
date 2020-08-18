<template>
  <div class="w-full h-screen overflow-hidden bck">
    <div class="formpnl login100-form" v-show="showLoginForm">
      <div class="title font-bold font-muli mt-4 text-green-400">freaquish</div>
      <div class="w-auto h-12 mt-8 border rounded-md border-green-400">
        <i class="fa fa-user-circle mt-4 text-white ml-2" aria-hidden="true"></i>
        <input
        class="outline-none bg-transparent ml-4 text-white font-muli"
        type="text" name="account_id"  placeholder="Phone Number" v-model="account_id">
      </div>
      <div class="w-auto h-12 mt-4 border rounded-md border-green-400">
        <i class="fa fa-key mt-4 text-white ml-2" aria-hidden="true"></i>
        <input
        class="outline-none bg-transparent ml-4 text-white font-muli"
        type="password" name="Password"  placeholder="Password" v-model="password">
      </div>
      <!-- <div class="text-right mt-4 mr-6 text-gray-600">Forget Password ?</div> -->
      <div class="w-full h-16 py-2 px-2 mt-10 flex ">
         <p @click="$router.push('/auth/register')" class="font-lato font-bold text-xl text-white mr-6 mt-3">Register</p>
         <button @click="login" class="w-full py-2 font-muli font-bold text-white bg-green-400 rounded-lg">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  data() {
      return {
        login_message: 'Please enter your credentials to login.',
        loginStage: 'login100-form',
        currentForm: 'login',
        account_id:undefined,
        password: undefined,
        error: false,
        error_text: undefined
      }
    },
  computed: {
        showRegisterForm() {
        return this.currentForm === 'register';
    },
    showLoginForm() {
        return this.currentForm === 'login';
    }
  },
    methods : {
      ...mapActions("auth/login",['loginAction']),
        toggleForm() {
            this.currentForm = this.currentForm === 'login' ? 'register' : 'login';
        },
        login: function(){
          if(this.account_id != undefined && this.password != undefined && this.account_id.length > 0 && this.password.length > 0){
            if(this.account_id.includes('+91')){
              this.account_id = this.account_id.replace("+91","")
            }
            this.loginAction({account_id:this.account_id, password: this.password});
          }
        }
  }
}
</script>

<style scoped>
.formpnl {
  width: 90%;
  margin: auto;
  margin-top: 15%;
  background: transparent;
  border-radius: 0.625rem;
  overflow: hidden;
}
.title {
  display: block;
  /* font-family: 'Nunito',sans-serif;

  background-color: #f3ec78;
  /* background-image: linear-gradient(45deg, #29013b,#378f0f,#ff38c3);
  background-image: conic-gradient(45deg,  #29013b,#288000,#ff57cd); */
  /* background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent; */
  line-height: 1.2;
  text-align: center;
    font-size: 39px;
}
.bck{
  background: #010141;
}
</style>
