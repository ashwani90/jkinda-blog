import articleApi from "@/api/article";

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const actionTypes = {
    getArticle: '[article] Get Article',
    deleteArticle: '[article] Delete Article'
}

export const mutationTypes = {
    getArticleStart: '[article] Get article start',
    getArticleSuccess: '[article] Get article success',
    getArticleFailure: '[article] Get article failure',

    deleteArticleStart: '[article] Delete article start',
    deleteArticleSuccess: '[article] Delete article success',
    deleteArticleFailure: '[article] Delete article failure'
}

const mutations = {
    [mutationTypes.getArticleStart](state) {
        state.isLoading = true,
        state.data = null
    },
    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false,
        state.data = payload
    },
    [mutationTypes.getArticleFailure](state) {
        state.isLoading = false
    },
    [mutationTypes.deleteArticleStart]() {},
    [mutationTypes.deleteArticleSuccess]() {},
    [mutationTypes.deleteArticleFailure]() {},    
}

const actions = {
    [actionTypes.getArticle] (context, {slug}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getArticleStart);
            articleApi.getArticle(slug).then(article => {
                context.commit(mutationTypes.getArticleSuccess, article);
                resolve(article);
            }).catch(() => {
                context.commit(mutationTypes.getArticleFailure);
            })
        })
    },
    [actionTypes.deleteArticle] (context, {slug}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteArticleStart);
            articleApi.deleteArticle(slug).then(article => {
                context.commit(mutationTypes.deleteArticleSuccess);
                resolve()
            }).catch(() => {
                context.commit(mutationTypes.deleteArticleFailure);
            })
        })
    }
}

export default {
    state,
    actions,
    mutations
}