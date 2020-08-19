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
        const url = `${"http://condom.freaquish.com/api/v1/"}auth/username_check?username=${username}`;
        let {data, status}= await this.$axios.get(url);
        if(status === 200 && data['available'] === 1){
            commit('updateUsernameAvailability', true);
            // state.usernameAvailable = true;
        }else{
            commit('updateUsernameAvailability', false);
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
                const url = `${"http://condom.freaquish.com/api/v1/"}auth/register`;
                delete this.$axios.defaults.headers.common["Authorization"];
                this.$axios.post(url, JSON.stringify(packet)).then((response) => {
                  console.log(response);
                    if(response.status == 201){
                        let storage = new FrozenStoreage();
                        //this.$auth.setToken('local','Token '+response.data.token);
                        storage.set('token', `Token ${response.data.token}`);
                        this.$axios.setHeader('Authorization',`Token ${response.data.token}`);
                       // this.$auth.ctx.app.$axios.setHeader('Authorization' `Token ${response.data.token}`);
                        storage.set('first_name', response.data.first_name);
                        storage.set('avatar', response.data.avatar);
                        storage.set('vintro','1');
                        this.$router.push('/')
                    }
                }).catch((err) =>{
                  console.log(err);
                    // if(err.response.status === 403){
                    //     commit('raiseError', 'Account already exist try login.');
                    // }else if(err.response.status === 406){
                    //     commit('raiseError', 'Form is incomplete.');
                    // }else{
                        commit('raiseError', 'Something bad is happening');
                    // }
                    commit('updatePageIndex',1);
                })

            }
    }
}

export const getters = {}
