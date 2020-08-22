import FrozenStoreage from "@/static/js/local_storage";
import {IncompleteDataException, BadRequestException, AccountExistException} from "@/static/js/exeptions";

export const state = () => ({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phoneNumber: undefined,
    countryCode: undefined,
    username: undefined,
    password: undefined,
    usernameAvailable: undefined,
    coords:undefined,
    err:false,
    errorText:undefined,
    pageIndex: 1,
    accountAvailable: undefined
});

export const mutations = {
    insertFirstPageData(state, payload){
        state.password = payload.password;
        if("email" in payload){
            state.email = payload.email;
        }
        if("phoneNumber" in payload){
            state.phoneNumber = payload.phoneNumber;
            state.countryCode = payload.countryCode;
        }
        state.password = payload.password;
    },

    insesrtSecondPageData: function(state, payload){
        state.username = payload.username;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.coords = payload.coords;
    },
    updateUsernameAvailability(state, available){
        state.usernameAvailable = available;
    },
    updateAccountAvailability(state, available){
        state.accountAvailable = available;
    },
    raiseError(state, text){
        state.err = true;
        state.errorText = text;
    },
    reduceError(state){
        state.err = false;
        state.text = undefined;
    },
    updatePageIndex(state, index){
        state.pageIndex = index;
    }
}

export const actions = {
    async checkUsernameAvailibility({commit, state}, username){
        const url = `auth/username_check?username=${username}`;
        let {data, status}= await this.$axios.get(url);
        if(status === 200 && data['available'] === 1){
            commit('updateUsernameAvailability', true);
            // state.usernameAvailable = true;
        }else{
            commit('updateUsernameAvailability', false);
        }
    },

    async checkAccountAvailibility({commit, state}, account){
        const url = `auth/account_check?aid=${username}`;
        let {data, status}= await this.$axios.get(url);
        if(status === 200 && data['available'] === 1){
            commit('updateAccountAvailability', true);
            // state.usernameAvailable = true;
        }else{
            commit('updateAccountAvailability', false);
        }
    },

    uploadDatatoServer({commit,state}){
        if (state.firstName != undefined && state.lastName != undefined, state.username != undefined &&
            state.usernameAvailable === true && (state.email != undefined || state.phoneNumber != undefined) && state.password != undefined
            ){
                let packet = {"username": state.username, "password": state.password, "first_name": state.firstName,
                              "last_name": state.lastName, "details": {}};
                if (state.email != undefined){
                    packet['details']['email'] = state.email;
                }
                if (state.phoneNumber != undefined){
                    packet['account_id'] = state.phoneNumber;
                    packet['details']['phone_number'] = state.phoneNumber;
                }
                if(state.coords != undefined){
                    packet['coords'] = state.coords;
                }
                const url = `auth/register`;
                delete this.$axios.defaults.headers.common["Authorization"];
                this.$axios.post(url, JSON.stringify(packet)).then((response) => {
                  console.log(response);
                    if(response.status == 201){
                        let storage = new FrozenStoreage();
                        //this.$auth.setToken('local','Token '+response.data.token);
                        storage.set('token', `Token ${response.data.token}`);
                        this.$axios.setHeader('Authorization',`Token ${response.data.token}`);
                       // this.$auth.ctx.app.$axios.setHeader('Authorization' `Token ${response.data.token}`);
                        storage.set('first_name',`${response.data.first_name}`);
                        storage.set('avatar', response.data.avatar);
                        storage.set('vintro','1');
                        this.$router.push('/')
                    }
                }).catch((err) =>{
                    commit('raiseError', 'Something bad is happening');
                    commit('updatePageIndex',1);
                })

            }
    }
}

export const getters = {}
