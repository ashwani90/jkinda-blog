import authApi from "@/api/auth";
import { setItem } from '@/helpers/persistanceStorage';

const state = {
    isSubmitting: false,
    isLoggedIn: null,
    isLoading: false,
    currentUser: null,
    validationErrors: null
}

export const mutationTypes = {
    registerStart: '[auth] Register start',
    registerSuccess: '[auth] Register success',
    registerFailure: '[auth] Register Failure',

    loginStart: '[auth] Login start',
    loginSuccess: '[auth] Login success',
    loginFailure: '[auth] Login Failure',

    getCurrentUserStart: '[auth] Get Currenct User start',
    getCurrentUserSuccess: '[auth] Get Currenct User success',
    getCurrentUserFailure: '[auth] Get Currenct User Failure',

    updateCurrentUserStart: '[auth] Update Current User start',
    updateCurrentUserSuccess: '[auth] Update Current User success',
    updateCurrentUserFailure: '[auth] Update Current User Failure',

    logout: '[auth] logout'
}

export const actionTypes = {
    register: '[auth] Register',
    login: '[auth] Login',
    getCurrentUser: '[auth] Get Current User',
    updateCurrentUser: '[auth] Update Current User',
    logout: '[auth] Logout',
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}

const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser
    },
    [getterTypes.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn)
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedIn === false
    }
}

const mutations = {
    [mutationTypes.registerStart] (state) {
        state.isSubmitting = true,
        state.validationErrors= null
    },
    [mutationTypes.registerSuccess] (state, payload) {
        state.isSubmitting = false,
        state.isLoggedIn = true,
        state.currentUser = payload
    },
    [mutationTypes.registerFailure] (state, payload) {
        state.isSubmitting = true,
        state.validationErrors = payload
    },
    [mutationTypes.loginStart] (state) {
        state.isSubmitting = true,
        state.validationErrors= null
    },
    [mutationTypes.loginSuccess] (state, payload) {
        state.isSubmitting = false,
        state.isLoggedIn = true,
        state.currentUser = payload
    },
    [mutationTypes.loginFailure] (state, payload) {
        state.isSubmitting = true,
        state.validationErrors = payload
    },
    [mutationTypes.getCurrentUserStart] (state) {
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess] (state, payload) {
        state.isLoading = false,
        state.isLoggedIn = true,
        state.currentUser = payload
    },
    [mutationTypes.getCurrentUserFailure] (state, payload) {
        state.isLoading = false,
        state.isLoggedIn = false,
        state.currentUser = null
    },
    [mutationTypes.updateCurrentUserStart] (state) {
        
    },
    [mutationTypes.updateCurrentUserSuccess] (state, payload) {
        state.currentUser = payload
    },
    [mutationTypes.updateCurrentUserFailure] (state) {
    },
    [mutationTypes.logout] () {
        state.currentUser = null,
        state.isLoggedIn = false
    }
}

const actions = {
    [actionTypes.register] (context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart);
            authApi.register(credentials)
            .then(response => {
                context.commit(mutationTypes.registerSuccess, response.data.user);
                setItem('accessToken', response.data.user.token);
                resolve(response.data.user);
            }).catch(result => {
                context.commit(mutationTypes.registerFailure, result.response.data.errors);
            })
        })
    },
    [actionTypes.login] (context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart);
            authApi.login(credentials)
            .then(response => {
                context.commit(mutationTypes.loginSuccess, response.data.user);
                setItem('accessToken', response.data.user.token);
                resolve(response.data.user);
            }).catch(result => {
                context.commit(mutationTypes.loginFailure, result.response.data.errors);
            })
        })
    },
    [actionTypes.getCurrentUser] (context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart);
            authApi.getCurrentUser()
            .then(response => {
                context.commit(mutationTypes.getCurrentUserSuccess, response.data.user);
                resolve(response.data.user);
            }).catch(result => {
                context.commit(mutationTypes.getCurrentUserFailure);
            })
        })
    },
    [actionTypes.updateCurrentUser] (context, {currentUserInput}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.updateCurrentUserStart);
            authApi.updateCurrentUser(currentUserInput)
            .then(user => {
                context.commit(mutationTypes.updateCurrentUserSuccess, user);
                resolve(user);
            }).catch(result => {
                context.commit(mutationTypes.updateCurrentUserFailure, result.response.data.errors);
            })
        })
    },
    [actionTypes.logout] (context) {
        return new Promise(resolve => {
            setItem('accessToken', '');
            context.commit(mutationTypes.logout);
            resolve();
        })
    },
}

export default {
    state, actions, mutations, getters
}