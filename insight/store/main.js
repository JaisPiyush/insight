import FrozenStorage from "@/static/js/local_storage.js";
import {avatarDefault} from '~/static/js/assets';

export const state = () => ({
  firstName: 'Welcome',
  avatar: avatarDefault,
  posts:[],
  onePost:{},
  loading:false,
  error: false
})

export const mutations = {
  setAccountData: function(state, payload){
    state.firstName = payload.meta.first_name || 'Welcome';
    state.posts = payload.posts;
    if(payload.meta.avatar != undefined && payload.meta.avatar.length > 0){
      state.avatar = [payload.meta.avatar];
    }else{
      state.avatar = avatarDefault;
    }
  },
  setPostData: function(state, payload){
    state.onePost = payload;
    console.log(state)
  },
  setLoadingState: function(val){
    state.loading = val;
  },
  setErrorState: function(val){
    state.error = val;
  },

  updateActions: function(state, payload){

    state.posts.forEach((post, i) => {

      if(post.post_id === payload.pid){
        switch (payload.action) {
          case 'love':
            post.meta.actions.loved = 1;
            post.footer.love += 1;
            break;
          case 'un_love':
            post.meta.actions.loved = 0;
            if(post.footer.love > 0){
              post.footer.love -= 1;
            }
            break;
          case 'view':
            post.meta.actions.viewed = 1;
            post.footer.view += 1;
            break;
          case 'share':
            post.meta.actions.shared = 1;
            post.footer.share += 1;
            break;
          case 'save':
            post.meta.actions.saved = 1;
            break;
          case 'un_save':
            post.meta.actions.saved = 0;
            break;
        }
      }
    });

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
      commit('setAccountData', res.data);
      commit('setLoadingState',false);

    }).catch(err => {
      console.log(err);
      commit('setLoadingState',false);
      commit('setErrorState',true);
    })
  },

  fetchPost: function({state,commit}, payload){
    commit('setLoadingState',true);
    commit('setErrorState',false);
    commit('setPostData', {});
    let storage = new FrozenStorage();
    let token = storage.get('token');
    const url = `${process.env.SERVER_API}post/${payload.pid}`;
    if(token != null){
      this.$axios.setHeader('Authorization',token);
    }
    this.$axios.get(url).then(res=>{
      console.log(res)
      commit('setPostData', res.data);
      commit('setLoadingState',false);
      payload.func();

    }).catch(err => {
      console.log(err);
      commit('setLoadingState',false);
      commit('setErrorState',true);
    })
  }
};
