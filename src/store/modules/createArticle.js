import articleApi from "@/api/article";

const state = {
    isSubmitting: false,
    validationErrors: null
}

export const actionTypes = {
    createArticle: '[createArticle] Create Article'
}

export const mutationTypes = {
    createArticleStart: '[createArticle] Create article start',
    createArticleSuccess: '[createArticle] Create article success',
    createArticleFailure: '[createArticle] Create article failure'
}

const mutations = {
    [mutationTypes.createArticleStart](state) {
        state.isSubmitting = true
    },
    [mutationTypes.createArticleSuccess](state, payload) {
        state.isSubmitting = false
    },
    [mutationTypes.createArticleFailure](state) {
        state.isSubmitting = false,
        state.validationErrors = payload
    }   
}

const actions = {
    [actionTypes.createArticle] (context, {articleInput}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.createArticleStart);
            articleApi.createArticle(articleInput).then(article => {
                context.commit(mutationTypes.createArticleSuccess, article);
                resolve(article);
            }).catch(() => {
                context.commit(mutationTypes.createArticleFailure, result.response.data.errors);
            })
        })
    }
}

export default {
    state,
    actions,
    mutations
}