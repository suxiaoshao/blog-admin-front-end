import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element'
import VueParticles from 'vue-particles'
import "./app.scss"
import axios from 'axios'


Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;
Vue.use(VueParticles);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
