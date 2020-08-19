<template>
  <div class="w-full h-screen overflow-hidden bck">
    <div class="formpnl login100-form" v-show="showLoginForm">
      <div v-if="this.error" class="h-12 rounded-lg w-full px-4 py-2 bg-red-600">
         <p class="font-lato font-bold text-white">Invalid Credentials, try again</p>
      </div>
      <div class="title font-bold font-muli mt-4 text-green-400">Freaquish</div>
      <div class="w-auto h-12 mt-8 border rounded-full border-white">
        <i class="fa fa-user-circle mt-4 text-white ml-2" aria-hidden="true"></i>
        <input
        class="outline-none bg-transparent ml-4 text-white font-muli"
        type="text" name="account_id"  placeholder="Phone Number" v-model="account_id">
      </div>
      <div class="w-auto h-12 mt-4 border rounded-full border-white">
        <i class="fa fa-key mt-4 text-white ml-2" aria-hidden="true"></i>
        <input
        class="outline-none bg-transparent ml-4 text-white font-muli"
        type="password" name="Password"  placeholder="Password" v-model="password">
      </div>
      <!-- <div class="text-right mt-4 mr-6 text-gray-600">Forget Password ?</div> -->
      <div class="w-full h-16 py-2 px-2 mt-10 flex">

         <button @click="login" class="w-full py-2 mx-5 font-muli font-bold focus:outline-none text-center text-white bg-green-400 rounded-full">Login</button>
      </div>
      <div class="ml-8 mr-8 text-center text-gray-200 mt-12 mb-8">
        <div class="text-md">Don't have any account, join us <br></div>
        <h1><a @click="$router.push('/auth/register')" class="mt-4 text-green-500 text-lg">REGISTER</a></h1>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from "vuex";
import FrozenStorage from "@/static/js/local_storage"
export default {
  mounted(){
    this.checkVintroViewed();
  },
  data() {
      return {
        login_message: 'Please enter your credentials to login.',
        loginStage: 'login100-form',
        currentForm: 'login',
        account_id:undefined,
        password: undefined,
      }
    },
  computed: {
    ...mapState("auth/login",['error']),
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
        },
        checkVintroViewed: function(){
          let storage = new FrozenStorage();
          let vintro = storage.get('vintro');
          if(vintro === null || vintro != '1'){
            this.$router.push('/intro')
          }else{
            let token = storage.get('token');
            if(token != null){
              this.$router.push('/')
            }
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
