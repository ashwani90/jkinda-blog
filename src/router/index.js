import Vue from 'vue';
import VueRouter from "vue-router";

import Login from '@/views/Login.vue';
import App from '@/App';
import GlobalFeed from '@/views/GlobalFeed.vue';
import YourFeed from '@/views/YourFeed.vue';
import TagFeed from '@/views/TagFeed.vue';
import Register from '@/views/Register.vue';
import Article from '@/views/Article.vue';
import CreateArticle from '@/views/CreateArticle.vue';
import EditArticle from '@/views/EditArticle.vue';
import Settings from '@/views/Settings.vue';
import UserProfile from '@/views/UserProfile.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/',
        name: 'globalfeed',
        component: GlobalFeed
    },
    {
        path: '/feed',
        name: 'yourfeed',
        component: YourFeed
    },
    {
        path: '/tags/:slug',
        name: 'tag',
        component: TagFeed
    },
    {
        path: '/articles/new',
        name: 'createArticle',
        component: CreateArticle
    },
    {
        path: '/articles/:slug',
        name: 'article',
        component: Article
    },
    {
        path: '/articles/:slug/edit',
        name: 'editArticle',
        component: EditArticle
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    },
    {
        path: '/profiles/:slug',
        name: 'userProfile',
        component: UserProfile
    },
    {
        path: '/profiles/:slug/favorites',
        name: 'userProfileFavorites',
        component: UserProfile
    }
]

const router = new VueRouter({
    routes
})

export default router;
