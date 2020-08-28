import FrozenStorage from '~/static/js/local_storage'
import {avatarDefault} from '~/static/js/assets'

export const state = () => ({
    followers:[],
    followings:[],
    loading: false,
    username:undefined,
});

export const mutations = {
    setState: function(state, payload){
        state.followers = payload.followers;
        state.followings = payload.followings;
    },
    setLoading: function(state, value){
        state.loading = value;
    },
    setAccount: function(state, data){
        state.username = data;
    }
};

export const actions = {
    fetchFollows: function({state, commit}, req){
        commit('setLoading', true);
        let url;
        if(state.username != undefined){
            url = `profile/third/follows/${req}?username=${state.username}`;
        }else{
            url = `profile/follows/${req}`;
            let storage = new FrozenStorage();
            let token = storage.get('token');
            if(token == null){
                this.$router.push('/auth/login')
            }else{
                this.$axios.setHeader("Authorization",token);
            }
        }

        this.$axios.get(url).then(res => {
            if(res.status === 200){
                // console.log(url,res.data);
                commit('setState', res.data);
                commit('setLoading', false);
            }
        }).catch(err => {
            console.log(err);
            commit('setLoading', false);
            this.$router.push('/auth/login')
        })
    },

    
};