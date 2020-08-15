

export const state = () => ({
    tags: [],
    hobbies: [],
    accounts:[],
    searchText: undefined
});

export const mutations = {
    setSearchText: function(state, text){
        state.searchText = text;
    },
   setSearchData: function(state, data){
       state.tags = data.tags || [];
       state.hobbies = data.hobbies || [];
       state.accounts = data.accounts || [];
   } 
};

export const actions = {}