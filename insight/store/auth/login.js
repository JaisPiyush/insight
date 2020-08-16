import FrozenStorage from "@/static/js/local_storage.js";

export const state = () => ({})

export const mutations = {};

export const actions = {
  loginAction: function({state, commit}, payload){
    let data = {account_id:payload.account_id, password: payload.password};
    const url = `${process.env.SERVER_API}auth/login`;
    let storage = new FrozenStorage();
    storage.set('vintro','1');
    this.$axios.post(url, JSON.stringify(data)).then(res => {
      if(satus === 202){
        storage.set('token',res.data.token);
        storage.set('first_name', res.data.first_name);
        storage.set('avatar', res.data.avatar);
        this.$router.push('/')
      }
    }).catch(err => {
      console.log(err);
      this.$router.push('/auth/register')
    });
  }
}
