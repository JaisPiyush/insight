import FrozenStorage from '@/static/js/local_storage.js'

export const state = () => ({

});

export const mutations = {



};

export const actions ={
  microActionPost: async function({ state,commit }, payload) {
    let storage = new FrozenStorage()
    let token = storage.get('token')
    let url = "" + "post/micro_action";
    // Comment and Save feature will only be enabled for known users.
    // If a non-registered user comments or save, the router shall navigate him to login
    // @payload contains {action: 'love/share/un_love/view/comment/save/un_save' , data:'comment-text'}
    // location is forbidden for now.
    if(token === null && (payload.action === 'comment' || payload.action === 'save' || payload.action === 'un_save')){
      this.$router.push('/auth/login');
    }else{
      if(token != null){
        this.$axios.setHeader('Authorization', token);
      }
      if(payload.action === 'comment'){
        let data = {"action":payload.action, "pid": payload.pid, "comment": payload.comment}
        this.$axios.post(url,JSON.stringify(data)).then(res => {
          if(payload.action_complete != undefined){
            payload.action_complete(payload);
          }
        });
      }else{
        url = `${url}?action=${payload.action}&pid=${payload.pid}`;
        this.$axios.get(url).then((res) =>{
            if(payload.action_complete != undefined){
              payload.action_complete();
            }

        });
      }
    }
  },
  followUser: function({state, commit}, payload){
    let storage = new FrozenStorage()
    let token = storage.get('token')
    let url = `profile/associate?fid=${payload.fid}&action=${payload.action}`;
    if(token === null ){
      this.$router.push('/auth/login');
    }else{
      this.$axios.setHeader('Authorization', token);
      this.$axios.get(url).then(res => {
        if(payload.action_complete != undefined){
          payload.action_complete();
        }
      })
    }
  }
};
