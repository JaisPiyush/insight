import * as firebase from 'firebase/app'
import 'firebase/storage'
var randomstring = require('randomstring')
import axios from '@nuxtjs/axios'

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
let storage = firebase.storage()
const firestore = storage.ref()

export function StorageVault(data) {
  this.progressUpload = 0
  this.imagesUrl = []
  this.videoUrl = undefined
  this.audioUrl = undefined
  this.uploadTask = undefined
  this.images = data.images || []
  this.video = data.video || undefined
  this.audio = data.audio || undefined
  this.current = {} // storing state of current asset in operation

  // Listener for change in state of upload
  this.snapshotListener = function(snapshot, listener) {
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    switch (snapshot.state) {
      case firebase.storage.TaskState.RUNNING:
        this.progressUpload = progress
        listener(progress)
        break
    }
    console.log(progress)
  }

  this.snapshotError = error => {
    this.error(error);
  }

  this.imageSnapShotComplete = () => {
    this.uploadTask.snapshot.ref.getDownloadURL().then(url => {
      this.imagesUrl.push(url)
      this.listener(url, 'image')
      //   this.listener()
    })
  }

  this.videoSnapShotComplete = () => {
    this.uploadTask.snapshot.ref.getDownloadURL().then(url => {
      this.videoUrl = url
    })
  }

  this.audioSnapShotComplete = () => {
    this.uploadTask.snapshot.ref.getDownloadURL().then(url => {
      this.audioUrl = url
    })
  }

  this.uploadAssetThroughUrl = function(
    url,
    type,
    completeListener,
    activelistener
  ) {
    fetch(url)
      .then(res => {
        res.blob().then(blob => {
          let name = randomstring.generate()
          let extension = blob.type.slice(
            blob.type.indexOf('/') + 1,
            blob.type.length
          )
          // console.log(extension)
          name = `${name}.${extension}`
          let metadata = { type: type, contentType: blob.type }
          // console.log(name)

          this.uploadTask = firestore
            .child(`assets/${name}`)
            .put(blob, metadata)
          this.uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              this.snapshotListener(snapshot, activelistener)
            },
            (err) => {
              this.error(err);
            },
            completeListener
          )
        })
      })
      .catch(err => {
        this.error(err)
      })
  }

  this.cancelUpload = () => {
    if (this.uploadTask != undefined) {
      this.uploadTask.cancel()
      this.clear();
    }
  }

  this.clear = () => {
    this.images = []
    this.video = undefined
    this.audio = undefined
    this.current = {}
    this.uploadTask = undefined
    this.progressUpload = 0
    this.imagesUrl = []
    this.videoUrl = undefined
    this.audioUrl = undefined
  }

  this.uploadAssets = async (listener, activelistener, err) => {
    this.error = err;
    this.listener = listener
    for (let index = 0; index < this.images.length; index++) {
      this.current = { type: 'image', index: index }
      await this.uploadAssetThroughUrl(
        this.images[index],
        'image',
        () => {
          listener()
          this.imageSnapShotComplete()
        },
        activelistener
      )
    }
    if (this.video != undefined) {
      this.current = { type: 'video', index: 0 }
      await this.uploadAssetThroughUrl(
        this.video,
        'video',
        () => {
          listener()
          this.videoSnapShotComplete()
        },
        activelistener
      )
    }
    if (this.audio != undefined) {
      this.current = { type: 'audio', index: 0 }
      await this.uploadAssetThroughUrl(
        this.audio,
        'audio',
        () => {
          listener()
          this.audioSnapShotComplete()
        },
        activelistener
      )
    }
  }
}
