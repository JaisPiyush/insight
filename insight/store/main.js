import FrozenStorage from "@/static/js/local_storage.js";
import {avatarDefault} from '~/static/js/assets';

export const state = () => ({
  firstName: 'Welcome',
  avatar: avatarDefault,
  links:{},
  nextFetchIndex:[],
  nextFetchedIndex:[],
  posts:[],
  onePost:{},
  loading:false,
  error: false
})

export const mutations = {
  setAccountData: function(state, payload){
    state.firstName = payload.meta.first_name || 'Welcome';
    if(payload.meta.avatar != undefined && payload.meta.avatar.length > 0){
      state.avatar = payload.meta.avatar;
    }else{
      state.avatar = avatarDefault;
    }
  },
  setPosts: function(state, payload){
    if(payload.links != undefined ){
      state.links.next = payload.links.next;
      state.links.previous = payload.links.previous;

      if(state.links.next != null){
        // console.log('working at non-null');
        if(state.links.previous === null){
          // First Page reset all indexes
          
          state.nextFetchedIndex = [];
          state.posts = payload.posts;
          state.nextFetchIndex =[payload.batch - 1];
        }

        else{
          if(!state.nextFetchIndex.includes(payload.batch + state.posts.length - 1)){
            state.nextFetchIndex.push(payload.batch + state.posts.length - 1)
          }
          state.posts = state.posts.concat(payload.posts);}}
      else if(state.links.next == null) {
        // console.log('working');
        state.posts = state.posts.concat(payload.posts);
        }
      }
    else if(state.links.next === undefined){
      state.nextFetchIndex =[];
      state.nextFetchedIndex = [];
      state.posts = payload.posts;}

      // console.log(state);
  },

  updateFetchedIndex: function(state, index){
    if(!state.nextFetchedIndex.includes(index)){
      state.nextFetchedIndex.push(index);
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
    // payload pid, action
    state.posts.forEach((post, index) => {
      if(post.post_id === payload.pid){
          let action = {...post.footer.action_map};
          let actionActive = {...post.meta.actions}
        switch (payload.action) {
          case 'love':
            action['love'] += 1;
            actionActive['loved'] = 1;
            break;
          case 'un_love':
            action['love'] -= 1;
            actionActive['loved'] = 0;
            break;
         case 'share':
            action['share'] += 1;
            actionActive['shared'] = 1;
            break;
         case 'save':
            actionActive['saved'] = 1;
            break;
         case 'un_save':
            actionActive['saved'] = 0;
            break;
        }
        post.footer.action_map = {...action};
        post.meta.actions = {...actionActive};
        // console.log(payload,action,actionActive);
        Object.assign(state.posts[index],post);
      }
    });
  },

  updateAssociation: function(state, payload){
    //payload aid action
    state.posts.forEach((post, index) => {
      if(post.meta.account_id === payload.aid){
        let header = {...post.header};
        if(payload.action === 'follow'){
          header.following = 1;
        }else if(payload.action === 'un_follow'){
          header.following = 0;
        }
        post.header = {...header};
        Object.assign(state.posts[index],post);
      }
    });

  }

// End of mutations
};

export const actions = {
  fetchFeed: async function({state,commit},index){
    commit('setLoadingState',true);
    commit('setErrorState',false);
    let storage = new FrozenStorage();
    let token = storage.get('token');
    let url = 'feed';
    if (state.links.next != null || state.links.next != undefined){
      url = `${url}${state.links.next}`;
    }
    if(token != null){
      this.$axios.setHeader('Authorization',token);
    }
    this.$axios.get(url).then(res=>{
      commit('setAccountData', res.data);
      commit('setPosts', res.data);
      if(index != undefined || index != null){
        commit('updateFetchedIndex',index);
      }
      storage.set('avatar',(res.data.meta.avatar != undefined && res.data.meta.avatar.length > 0)?res.data.meta.avatar : avatarDefault )
      commit('setLoadingState',false);

    }).catch(err => {
      // console.log(err);
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
    const url = `post/${payload.pid}`;
    if(token != null){
      this.$axios.setHeader('Authorization',token);
    }
    this.$axios.get(url).then(res=>{
      // console.log(res)
      commit('setPostData', res.data);
      commit('setLoadingState',false);
      payload.func();

    }).catch(err => {
      // console.log(err);
      commit('setLoadingState',false);
      commit('setErrorState',true);
    })
  }
};
