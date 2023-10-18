import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@store/modules/auth';

Vue.useAttrs(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth
    }
})