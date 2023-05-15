import Vue from 'vue';
import App from './App.vue';
import Application from './core/Application';
import router from './router';

import './plugins/VueBus';
import './plugins/VueLazyload';
import vuetify from './plugins/Vuetify';

Vue.config.productionTip = false;

Application.initialize()
    .then(() => {
        new Vue({
            router,
            vuetify,
            render: (h) => h(App),
        }).$mount('#app');
    })
    .catch(() => {
        new Vue({
            render: (h) => h('h1', 'Something went wrong... ¯\\_(ツ)_/¯'),
        }).$mount('#app');
    });
