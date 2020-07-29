import FrozenStoreage from "@/static/js/local_storage";
import {IncompleteDataException, BadRequestExcption} from "@/static/js/exeptions";

export const state = () => ({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phoneNumber: undefined,
    countryCode: undefined,
    username: undefined,
    password: undefined,
    usernameAvailable: undefined,
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
    },
    updateUsernameAvailability(state, available){
        state.usernameAvailable = available;
    },
}

export const actions = {
    async checkUsernameAvailibility({commit, state}, username){
        const url = `${process.env.SERVER_API}auth/username_check?username=${username}`;
        let {data, status}= await this.$axios.get(url);
        if(status === 200 && data['available'] === 1){
            commit('updateUsernameAvailability', true);
            // state.usernameAvailable = true;
        }else{
            commit('updateUsernameAvailability', false);
        }
    },

    async uploadDatatoServer({commit, state}){
        if (state.firstName != undefined && state.lastName != undefined, state.username != undefined &&
            usernameAvailable === true && (state.email != undefined || state.phoneNumber != undefined) && state.password != undefined
            ){
                let packet = {"username": state.username, "password": state.password, "first_name": state.firstName,
                              "last_name": state.lastName, "detail": {}};
                if (state.email != undefined){
                    packet['account_id'] = state.email;
                    packet['detail']['email'] = state.email;
                }
                if (state.phoneNumber != undefined){
                    packet['account_id'] = state.phoneNumber;
                    packket['detail']['phone_number'] = state.phoneNumber;
                }
                
                let {data, status} = await this.$axios.post('auth/register', JSON.stringify(packet));
                if (status === 201){
                    let storage = new FrozenStoreage();
                    storage.set('token', data.token);
                    storage.set('first_name', data.first_name);
                    storage.set('avatar', data.avatar);
                }else if(status === 406){
                    throw new IncompleteDataException();
                }else{
                    throw new BadRequestExcption();
                }

            }
            throw new IncompleteDataException();
    }
}

export const getters = {}