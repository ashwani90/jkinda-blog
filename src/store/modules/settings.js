import { mutationTypes as authMutationTypes } from '@/store/modules/auth';

const state = {
    isSubmitting: false,
    validationErrors: null
}

const mutations = {
    [authMutationTypes.updateCurrentUserStart] (state) {
        state.isSubmitting = true,
        state.validationErrors = null
    },
    [authMutationTypes.updateCurrentUserSuccess] (state, payload) {
        state.isSubmitting = false
    },
    [authMutationTypes.updateCurrentUserFailure] (state) {
        state.isSubmitting = false,
        state.validationErrors = payload
    }
}

export default {
    state,
    mutations
}