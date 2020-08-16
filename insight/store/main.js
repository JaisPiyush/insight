import FrozenStorage from "@/static/js/local_storage.js";
import {avatarDefault} from '~/static/js/assets'
export const state = () => ({
  firstName: 'Welcome',
  avatar: avatarDefault,
  posts:[],
  loading:false,
  error: false
})

export const mutations = {
  setAccountData: function(state, payload){
    state.firstName = payload.meta.first_name || 'Welcome';
    state.posts = payload.posts;
    if(payload.meta.avatar != undefined){
      state.avatar = payload.meta.avatar;
    }
  },

  setLoadingState: function(val){
    state.loading = val;
  },
  setErrorState: function(val){
    state.error = val;
  }
};

export const actions = {
  fetchFeed: function({state,commit}){
    commit('setLoadingState',true);
    commit('setErrorState',false);
    let storage = new FrozenStorage();
    let token = storage.get('token');
    const url = `${process.env.SERVER_API}feed`
    if(token != null){
      this.$axios.setHeader('Authorization',token);
    }
    this.$axios.get(url).then(res=>{
      console.log(res)
      commit('setAccountData', res.data);
      commit('setLoadingState',false);

    }).catch(err => {
      console.log(err);
      commit('setLoadingState',false);
      commit('setErrorState',true);
    })
  }
};
