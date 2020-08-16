<template>
    <div id="login-page" class="login-page w-full h-auto">
  <div class="form w-full h-full relative" >
    <div class="absolute z-10 w-full h-full">
      <img src="@/assets/img/bg.png" class="w-full h-full" />
    </div>
  <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54 absolute z-10">
    <form class="login100-form validate-form" v-show="showLoginForm">
      <span class="login100-form-title p-b-49 font-bold">
						FREAQUISH
					</span>
          <input class="w-full h-10 border border-white font-muli corp-black outline-none placeholder  caret-white" placeholder="Phone" v-model="username" type="text" />
          <input class="w-full h-10 my-2 border border-white font-muli corp-black outline-none placeholder  caret-white" placeholder="Password" v-model="password" type="password" />

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn">
								Login
							</button>
						</div>
					</div>
      <div class="flex-col-c text-center p-t-155 p-l-155">
						<div class="wraptxt2">
              <span class="text-gray-400 p-b-17">
							Dont't have any account Sign Up here,
						</span>
            </div>
						<div class="wraptxt3 text-center">
              <a href="#" class="txt2 " @click="$router.push('/auth/register')">
							Register
						</a>
            </div>
					</div>
    </form>
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
        username:undefined,
        password: undefined
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
          if(this.username != undefined && this.password != undefined && this.username.length > 0 && this.password.length > 0){
            this.loginAction({account_id:this.username, password: this.password});
          }
        }
  }
}
</script>





<style scoped>

.corp-black{
  background-color: rgba(0,0,0,.03);
}

.caret-white{
  caret-color: white;
}


input {
	outline: none;
}

/*---------------------------------------------*/
button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

iframe {
	border: none !important;
}



/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.txt1 {
  font-family: Poppins-Regular;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #75f7ba,rgb(105, 245, 221), #71a0f7, #4577d3);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-align: center;
}

.txt2 {
  font-family: Poppins-Regular;
  font-size: 1.3rem;
  line-height: 1.5;
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #fc93ea, #528cf8);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-transform: uppercase;
}

.wraptxt1 {
  padding-top: 0.3125rem;

}

.wraptxt2 {
  padding-top: 3.75rem;
}

.wraptxt3 {
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.wraptxt4 {
  padding-top: 2rem;
}

/*//////////////////////////////////////////////////////////////////
[ login ]*/

.login-page {
  width: 100%;
  margin: auto;
}
.form {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  z-index: 1;
}

.wrap-login100 {

  width: 350px;
  background: rgba(0,0,0,.7);
  border-radius: 0.625rem;
  overflow: hidden;
}


/*------------------------------------------------------------------
[ Form ]*/

.login100-form {
  width: 100%;
  padding-left: 1.875rem;
  padding-right: 1.875rem;
  padding-top: 1rem;
}

.login200-form {
  width: 100%;
  padding-left: 1.875rem;
  padding-right: 1.875rem;
  padding-top: 1rem;

}


.login100-form-title {
  display: block;
  font-family: 'Nunito',sans-serif;
  font-size: 39px;
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #d147f3,#d147f3,  #45c2f3,#373bfd);
  background-image: conic-gradient(45deg,#d147f3,#d147f3, #45c2f3, #373bfd);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  line-height: 1.2;
  text-align: center;
  padding-bottom: 1rem;

}



/*------------------------------------------------------------------
[ Input ]*/



.wrap-input100 {
  width: 100%;
  position: relative;
  border-bottom: 0.125rem solid #d9d9d9;
  padding-top: 1.25rem;
}

.label-input100 {
  font-family: sans-serif;
  font-size: 0.875rem;
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #85f1bf, #6f9df3);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  line-height: 1.5;
  padding-left: 0.4375rem;
}

.input100 {
  font-family: sans-serif;
  font-size: 0.875rem;
  color: #f3ebeb;
  line-height: 1.2;

  display: block;
  width: 100%;
  height: 3.4375rem;
  background: transparent;
  padding: 0 0.4375rem 0 2.6875rem;

}

.input200 {
  font-family: sans-serif;
  font-size: 0.875rem;
  color: #f3ebeb;
  line-height: 1.2;
  display: block;
  width: 100%;
  height: 2rem;
  background: transparent;
  padding: 0 0 0 1rem;

}


/*---------------------------------------------*/
.focus-input100 {
  position: absolute;
  display: block;
  width: 1.5625rem;
  height: 1.5625rem;
  left: 0rem;
  top: 3.75rem;
  pointer-events: none;
}

.focus-input100::after {
  content: attr(data-symbol);
  font-family: sans-serif;
  color: #adadad;
  font-size: 1.375rem;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: calc(100% - 1.25rem);
  bottom: 0;
  left: 0;
  padding-left: 0.8125rem;
  padding-top: 0.1875rem;
}

.focus-input100::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -0.125rem;
  left: 0;
  width: 0;
  height: 0.125rem;
  background: #7f7f7f;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}


.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::before {
  width: 100%;
}

.input100:focus + .focus-input100::after {
  color: #a64bf4;
}

.has-val.input100 + .focus-input100::after {
  color: #a64bf4;
}


/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 1.25rem;
}

.wrap-login100-form-btn {
  width: 80%;
  display: block;
  position: relative;
  z-index: 1;
  border-radius: 1.5625rem;
  overflow: hidden;
  margin: 0 auto;

  box-shadow: 0 0.3125rem 1.875rem 0rem rgba(3, 216, 222, 0.2);
  -moz-box-shadow: 0 0.3125rem 1.875rem 0rem rgba(3, 216, 222, 0.2);
  -webkit-box-shadow: 0 0.3125rem 1.875rem 0rem rgba(3, 216, 222, 0.2);
  -o-box-shadow: 0 0.3125rem 1.875rem 0rem rgba(3, 216, 222, 0.2);
  -ms-box-shadow: 0 0.3125rem 1.875rem 0rem rgba(3, 216, 222, 0.2);
}

.login100-form-bgbtn {
  position: absolute;
  z-index: -1;
  width: 300%;
  height: 100%;
  background: #a64bf4;
  background: -webkit-linear-gradient(to right,#23f895, #3643f5, #23f895, #3643f5);
  background: -o-linear-gradient(to right,#23f895, #3643f5, #23f895, #3643f5);
  background: -moz-linear-gradient(to right, #23f895, #3643f5, #23f895, #3643f5);
  background: linear-gradient(to right, #23f895, #3643f5, #23f895, #3643f5);
  top: 0;
  left: -100%;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn {
  font-family: sans-serif;
  font-size: 1rem;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.25rem;
  width: 100%;
  height: 3.125rem;
}

.wrap-login100-form-btn:hover .login100-form-bgbtn {
  left: 0;
}


/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: #fff;
  border: 1px solid #c80000;
  border-radius: 2px;
  padding: 4px 25px 4px 10px;
  bottom: calc((100% - 20px) / 2);
  -webkit-transform: translateY(50%);
  -moz-transform: translateY(50%);
  -ms-transform: translateY(50%);
  -o-transform: translateY(50%);
  transform: translateY(50%);
  right: 2px;
  pointer-events: none;

  font-family: sans-serif;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: sans-serif;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 16px;
  bottom: calc((100% - 20px) / 2);
  -webkit-transform: translateY(50%);
  -moz-transform: translateY(50%);
  -ms-transform: translateY(50%);
  -o-transform: translateY(50%);
  transform: translateY(50%);
  right: 8px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
