import FrozenStorage from '@/static/js/local_storage.js'

export const state = () => ({
    
});

export const mutations = {
  
};

export const actions ={
  microActionPost: async function({ state }, payload) {
    let storage = new FrozenStorage()
    let token = storage.get('token')
    let url = process.env.SERVER_API + "post/micro_action"
    // Comment and Save feature will only be enabled for known users.
    // If a non-registered user comments or save, the router shall navigate him to login
    // @payload contains {action: 'love/share/un_love/view/comment/save/un_save' , data:'comment-text'}
    // location is forbidden for now.
    if(token === null && (payload.action === 'comment' || payload.action === 'save' || payload.action === 'un_save')){
      this.$router.push('/auth/login');
    }else{
      if(token != null){
        this.$axios.setHeader('Authorization', token);;
      }
      if(payload.action === 'comment'){
        let data = {"action":payload.action, "pid": payload.pid, "comment": payload.comment}
        this.$axios.post(url,JSON.stringify(data));
      }else{
        url = `${url}?action=${payload.action}&pid=${payload.pid}`;
        this.$axios.get(url).then((res) =>{
          if(status === 200){
            if(payload.action_complete != undefined){
              payload.action_complete();
            }
          }
        });
      }
    }
  }
};
