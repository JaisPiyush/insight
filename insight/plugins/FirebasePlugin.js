import * as firebase from  'firebase/app';
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBAEkJI3NqBpXMh4ZdhG4oLj6Ar-Tz_b0o",
    authDomain: "social-express-103904.firebaseapp.com",
    databaseURL: "https://social-express-103904.firebaseio.com",
    projectId: "social-express-103904",
    storageBucket: "social-express-103904.appspot.com",
    messagingSenderId: "1008243500476",
    appId: "1:1008243500476:web:baeeb56c63dfcd707337b9",
    measurementId: "G-2S9ZEH4HL7"
  };
// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export function PhoneAuthentication(phoneNumber, elemId){
    this.phoneNumber = phoneNumber;
    this.elemId = elemId;
    this.recaptcha = window.recaptchaVerifier;
    this.user = undefined;

    // Getter User
    this.getUser = function(){
        return this.user;
    }
    // Captcha Invisible
    this.$captcha = function(){
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.elemId, {
            'size': 'normal',
            'callback': function(response){
                console.log(response);
                this.recaptcha = window.recaptchaVerifier;
                this.$authenticate();
            }
        });
    }

    // phone auth
    this.$authenticate = function(){
        firebase.auth().signInWithPhoneNumber(`+91${phoneNumber}`,this.recaptcha)
        .then((response) =>{
            window.confirmationResult = response;
        }).catch((error) => {
            console.log(error);
        });
    }
    
    // authenticate code on press verify
    this.$authenticateCode = function(code){
        window.confirmationResult.confirm(code).then(
            (result) => {
                this.user = result.user;
            })
    }
}
