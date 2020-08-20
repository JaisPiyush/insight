import FrozenStorage from "@/static/js/local_storage.js";

export const state = () => ({
  error: false
})

export const mutations = {
  setErrorState: function(state, val){
    state.error = val;
  }
};

export const actions = {
  loginAction: function({state, commit}, payload){
    commit('setErrorState',false)
    let data = {account_id:payload.account_id, password: payload.password};
    const url = `auth/login`;
    let storage = new FrozenStorage();
    storage.set('vintro','1');
    this.$axios.post(url, JSON.stringify(data)).then(res => {
      if(res.status === 202){
        commit('setErrorState',false)
        storage.set('token',`Token ${res.data.token}`);
        storage.set('first_name', res.data.first_name);
        storage.set('avatar', res.data.avatar);
        this.$router.push('/')
      }
    }).catch(err => {
      commit('setErrorState',true);
    });
  }
}
