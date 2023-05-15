import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../pages/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '*',
        name: 'home',
        components: { default: HomeView },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
