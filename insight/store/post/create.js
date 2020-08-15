import { StorageVault } from '@/plugins/FirebasePlugin.js'
import FrozenStorage from '@/static/js/local_storage'
export const state = () => ({
  hobby_list: [],
  hobbyText:'',
  hobby: {},
  assets: {},
  editor: undefined,
  assetsUrl: {
    images: [],
    video: undefined,
    audio: undefined
  },
  current: {},
  progress: 0,
  completed: false,
  nextUrl: '',
  sentData: false,
  caption: undefined,
  text: {
    bgColor: undefined,
    fontName: undefined,
    fontColor: undefined,
    data: undefined
  },
  meta: {},
  error: false,
  errorMessage: undefined
})

export const mutations = {
  insertTextData: function(state, payload) {
    state.text.data = payload.data
    state.text.fontName = payload.fontName
    state.text.fontColor = payload.fontColor
    state.text.bgColor = payload.bgColor
    state.editor = payload.editor;
  },
  insertAssets: function(state, payload) {
    if ('images' in payload) {
      state.assets.images = payload.images
    }
    if ('video' in payload) {
      state.assets.video = payload.video
    }
    if ('audio' in payload) {
      state.assets.audio = payload.audio
    }
    state.editor = payload.editor;
  },
  insertCaption: function(state, payload) {
    state.caption = payload
  },
  updateProgress: function(state, value) {
    state.progress = value
  },
  setCurrent: function(state, data) {
    if (data.type === 'image') {
      state.current = { type: 'image', data: state.assets.images[data.index] }
    } else {
      state.current = {
        type: data.type,
        data: data.type === 'audio' ? this.assets.audio : state.assets.video
      }
    }
  },
  insertAssetUrl: function(state, payload) {
    if (payload.type === 'image') {
      state.assetsUrl.images.push(payload.url)
    } else if (payload.type === 'video') {
      state.assetsUrl.video = payload.url
    } else if (payload.type === 'audio') {
      state.assetsUrl.audio = payload.url
    }
    state.editor = payload.editor
  },
  sentDataToServer: function(state) {
    state.sentData = true
  },
  interactError: function(state, err) {
    state.error = err.error
    state.errorMessage = err.msg;
    state.nextUrl = '/'
  },
  setHobbies: function(state, data) {
    state.hobby_list = data;
    for(let index=0; index < data.length; index++){
      state.hobbyText = `${state.hobbyText} ${data[index].name}`;
    }
  },
  setCompleted: function(state) {
    state.assets.images = state.assetsUrl.images
    state.assets.video = state.assetsUrl.video
    state.assets.audio = state.assetsUrl.audio
    state.completed = true;
    this.dispatch("post/create/sendDataToServer");
  },
  setHobby: function(state, payload){
    state.hobby = {...payload};
  },
  reset: function(state) {
    state.assets = {}
    state.editor = undefined
    state.assetsUrl = {
      images: [],
      video: undefined,
      audio: undefined
    }
    state.current = {}
    state.progress = 0
    state.completed = false
    state.sentData = false
    state.caption = undefined
    state.nextUrl = ''
    state.text = {
      bgColor: undefined,
      fontName: undefined,
      fontColor: undefined,
      data: undefined
    }
    state.meta = {}
    state.error = false
  },

  setNextUrl: function(state, data) {
    state.nextUrl = data
  }
}

export const actions = {
  fetchHobbies: function({ commit }) {
    let url = `${process.env.SERVER_API}fetch_hobby`
    this.$axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          commit('interactError', false)
          commit('setHobbies', res.data.hobbies)
        }
      })
      .catch(err => {
        commit('interactError', {
          error: true,
          msg: "Couldn't get the hobbies, please try again"
        })
      })
  },
  sendDataToServer: function({state, commit}) {
    let data = {
      assets: {},
      hobby: state.hobby.code_name,
      hobby_name: state.hobby.name,
      editor: state.editor
    }
    if (state.assets.images.length > 0) {
      data['assets']['images'] = state.assets.images
    }
    if (state.assets.video != undefined) {
      data['assets']['video'] = state.assets.video
    }
    if (state.assets.audio != undefined) {
      data['assets']['audio'] = state.assets.audio
    }
    if (state.assets.text != undefined) {
      data['assets']['text'] = { ...state.text }
      data['hastags'] = state.text.data.match(/#[a-z0-9_?]+/gi) || []
      data['atags'] = state.text.data.match(/@[a-z0-9_?]+/gi) || []
    }
    if (state.caption != undefined) {
      data['caption'] = state.caption
      data['hastags'] = data['hastags'].concat(
        state.caption.match(/#[a-z0-9_?]+/gi) || []
      )
      data['atags'] = data['atags'].concat(
        state.caption.match(/#[a-z0-9_?]+/gi) || []
      )
    }
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        data['coords'] = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        }
      })
    }
    let url = `${process.env.SERVER_API}create_hobby`
    let storage = new FrozenStorage()
    let token = storage.get('token')
    if (token === null) {
      commit('interactError', {
        error: true,
        msg: "Couldn't find account details."
      })
      commit('reset')
      commit('setNextUrl', '/auth/login')
    } else {
      //TODO: Token insertion, more security required
      console.log(data)
      this.$axios.setHeader('Authorization', token)
      this.$axios
        .post(url, JSON.stringify(data))
        .then(res => {
          if (res.status === 201) {
            commit('sentDataToServer')
            commit('reset')
            this.$router.push('/')
          }
        })
        .catch(err => {
          if(err.status === 401 || err.status === 403){
            commit('interactError', {
              error: true,
              msg: 'You should login, or register if you are new.'
            });
          }else{
            commit('interactError', {
              error: true,
              msg: 'Media transfer failed due to bad network.'
            });
          }
          console.log(err)
        })
    }
  },
  uploadFilesToFirebase: function({ state, commit }) {
    if(window.navigator.onLine){
    let storage = new StorageVault(state.assets)
    storage.uploadAssets(
      (url, type) => {
        commit('insertAssetUrl', { url: url, type: type });
        let assetlength = state.assets.images.length + (state.assets.video === undefined ? 0 : 1) + (state.assets.video === undefined ? 0 : 1); 
        let assetsUrllength = state.assetsUrl.images.length + (state.assetsUrl.video === undefined ? 0 : 1) + (state.assetsUrl.video === undefined ? 0 : 1);
        if(assetlength === assetsUrllength){
            commit('setCompleted');
        }
      },
      (progress, current) => {
        commit('updateProgress', progress)
        // commit('setCurrent', current);
      },
      (err) => {
          console.log('wrritte',err);
        commit('interactError', {
          error: true,
          msg: 'Media transfer failed due to bad network.'
        });
      }
    );
   }else{
    commit('interactError', {
        error: true,
        msg: 'No Internet Connection.'
      });       
   }
  }
}
