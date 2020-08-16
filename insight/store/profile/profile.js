import FrozenStorage from '~/static/js/local_storage'
import { StorageVault } from '~/plugins/FirebasePlugin'
import {avatarDefault} from '~/static/js/assets'
export const state = () => ({
  aid: undefined,
  avatar:avatarDefault,
  places: [],
  description: undefined,
  following: 0,
  followers: 0,
  firstName: undefined,
  lastName: undefined,
  username: undefined,
  editable: false,
  collections: [],
  loading: false,
  error: false,
  placesEdit: {
    index: undefined,
    name: undefined,
    city: undefined
  }
})

export const mutations = {
  setPlacesEdit: function(state, edits) {
    state.placesEdit.name = edits.name
    state.placesEdit.city = edits.city
    if ('index' in edits) {
      state.placesEdit.index = edits.index
    }
  },
  insertProfileData: function(state, payload) {
    state.aid = payload.account_id
    if (payload.avatar.length > 2) {
      state.avatar = payload.avatar
    }
    state.places = []
    for (let index = 0; index < payload.places.length; index++) {
      let split = payload.places[index].split(',')
      state.places.push(split[0], split[1])
    }
    state.description = payload.description
    state.following = payload.following_count
    state.followers = payload.follower_count
    state.firstName = payload.first_name
    state.lastName = payload.last_name
    state.username = payload.username
    state.collections = payload.posts
  },
  setLoadingState: function(state, loading) {
    state.loading = loading
  },
  setErrorState: function(state, error) {
    state.error = error
  },
  insertPlace: function(state, payload) {
    if (payload.index === undefined) {
      state.places.push([payload.name, payload.city])
    } else if (payload.index < state.places.length) {
      state.places[payload.index] = [payload.name, payload.city]
    }
  },
  setAvatar: function(state, url) {
    state.avatar = url
  },
  setDescription: function(state, desc) {
    state.description = desc
  },
  setName: function(state, name) {
    state.firstName = name.firstName
    state.lastName = name.lastName
  },
  setEditablity: function(state, edit) {
    state.editable = edit
  }
}

export const actions = {
  fetchProfile: function({ state, commit }, func) {
    commit('setLoadingState', true)
    let storage = new FrozenStorage()
    let token = storage.get('token')
    const url = `${process.env.SERVER_API}profile`
    // console.log(token)
    if (token != null) {
      this.$axios.setHeader('Authorization', token)
      this.$axios
        .get(url)
        .then(res => {
          if (res.status === 200) {
            commit('insertProfileData', res.data)
            commit('setEditablity', true)
            commit('setLoadingState', false)
            func()
          }
        })
        .catch(error => {
          commit('setLoadingState', false)
          commit('setErrorState', true)
        })
    } else {
      this.$router.push('/auth/login')
    }
  },
  updateProfileData: async function({ state, commit }, payload) {
    let data = { ...payload }
    commit('setLoadingState', true)
    let storage = new FrozenStorage()
    let token = storage.get('token')
    const url = `${process.env.SERVER_API}profile`
    if (token === null) {
      this.$router.push('/auth/login')
    } else {
      this.$axios.setHeader('Authorization', token)
      this.$axios
        .post(url, JSON.stringify(data))
        .then(res => {
          if (res.status === 202) {
            commit('insertProfileData', res.data)
            commit('setEditablity', true)
            commit('setLoadingState', false)
            console.log(res.data)
          }
        })
        .catch(error => {
          commit('setLoadingState', false)
          commit('setErrorState', true)
        })
    }
  },
  uploadImageToFirebase: function({ state, commit, dispatch }, payload) {
    if (window.navigator.onLine) {
      let storage = new StorageVault({ images: [payload.src] })
      storage.uploadAssets(
        (url, type) => {
          console.log('img', url)
          if (url != undefined) {
            dispatch('updateProfileData', { avatar: url })
          }

          payload.func()
        },
        (progress, current) => {},
        err => {
          console.log('wrritte', err)
        }
      )
    }
  },
  fetchThirdProfile: function({ state, commit }, load) {
    commit('setLoadingState', true)
    let storage = new FrozenStorage()
    let token = storage.get('token')
    const url = `${process.env.SERVER_API}profile/third/${load.aid}`
    // console.log(token)
    if (token != null) {
      this.$axios.setHeader('Authorization', token)
    }
    this.$axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          commit('insertProfileData', res.data)
          commit('setEditablity', false)
          commit('setLoadingState', false);
          load.func();
        }
      })
      .catch(error => {
        commit('setLoadingState', false)
        commit('setErrorState', true)
      })
  }
}
