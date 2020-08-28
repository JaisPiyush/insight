import * as firebase from 'firebase/app'
import 'firebase/storage'
var randomstring = require('randomstring')
import axios from '@nuxtjs/axios'

// TODO: Transfer every key to .env
var firebaseConfig = {
  apiKey: 'AIzaSyBAEkJI3NqBpXMh4ZdhG4oLj6Ar-Tz_b0o',
  authDomain: 'social-express-103904.firebaseapp.com',
  databaseURL: 'https://social-express-103904.firebaseio.com',
  projectId: 'social-express-103904',
  storageBucket: 'social-express-103904.appspot.com',
  messagingSenderId: '1008243500476',
  appId: '1:1008243500476:web:baeeb56c63dfcd707337b9',
  measurementId: 'G-2S9ZEH4HL7'
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Initiating storage API of firebase
let storage = firebase.storage();
const firestore = storage.ref();

export function StorageVaultBeta(data){
  this.assets = data;
  this.uploadedAssets = {};

  let self = this;

  this.generate_name = function(blob){
    let name = randomstring.generate()
    let extension = blob.type.slice(
      blob.type.indexOf('/') + 1,
      blob.type.length
    )
    // console.log(extension)
    name = `${name}.${extension}`
    return name;
  }

  this.is_images_complete = function(){
    if(this.assets.images === undefined){
      return true;
    }
    else if(self.uploadedAssets.images != undefined && self.assets.images.length === self.uploadedAssets.images.length){
      return true;
    }
    return false;
  }

  this.is_video_complete = function(){
    if(self.assets.video === undefined){
      return true;
    }else{
      if(self.uploadedAssets.video != undefined){
        return true;
      }
      return false;
    }
  }

  this.is_audio_complete = function(){
    if(self.assets.audio === undefined){
      return true;
    }else{
      if(self.uploadedAssets.audio != undefined){
        return true;
      }
      return false;
    }
  }

  this.is_completed = function(){
    console.log('chcecking for completion', this.uploadedAssets);
    if(self.is_audio_complete() && self.is_images_complete() && self.is_video_complete()){
      return true;
    }
    return false;
  }

  this.insert_asset = function(url,type){
    if(type === "image"){
      if(this.uploadedAssets.images === undefined){
        this.uploadedAssets.images = [];
      }
      this.uploadedAssets.images.push(url);
    }else if(type === "video"){
      this.uploadedAssets.video = url;
    }else if(type === "audio"){
      this.uploadedAssets.audio = url;
    }
    console.log(this.uploadedAssets)
  }




  this.uploadPromise = function(assets){
    const promises = [];
    assets.forEach(asset =>{
      let uploadTask;
      fetch(asset.url).then(res =>{
         res.blob().then(blob=>{
             let name = self.generate_name(blob);
             uploadTask = firestore.child(`assets/${name}`).put(blob);
             promises.push(uploadTask);
             uploadTask.on(
               firebase.storage.TaskEvent.STATE_CHANGED, // State Changes
               (snapshot) => {
                 let progress = snapshot.bytesTransferred/snapshot.totalBytes;
                 if(snapshot.state === firebase.storage.TaskState.RUNNING){
                    self.progress_listener({progress:progress, src:asset.url, type:asset.type});
                 }
               },
               (error) => {
                 self.error_listener(error);
               },
              async () => {
                let durl = await uploadTask.snapshot.ref.getDownloadURL();
                console.log(durl)
                 URL.revokeObjectURL(asset.url);
                 self.insert_asset(durl,asset.type);
                 if(self.is_completed()){
                     console.log('In complete')
                    self.complete_listener(self.uploadedAssets)
                  }
                 }
             );
          }).catch(error => {self.error_listener(error)});
      }).catch(error => {self.error_listener(error)});
    });
    return promises;
  }

  this.bulk_upload = function(listeners){
    self.complete_listener = listeners.complete || ((assets) => {});
    self.progress_listener = listeners.progress || ((progress) => {});
    self.error_listener = listeners.error || ((error) => {});
    let asset_list = [];
    for(let [key,value] of Object.entries(self.assets)){
      if(key === "images"){
        for(let i=0; i < value.length; i++){
          asset_list.push({url:value[i],type:"image"})
        }
      }else if(key === "video"){
        asset_list.push({url:value,type:"video"});
      }else if(key === "audio"){
        asset_list.push({url:value, type:"audio"});
      }
    }
   console.log(asset_list);
   Promise.all(self.uploadPromise(asset_list)).then(() => {
   });
  }
}
