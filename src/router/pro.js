// import Vue from 'vue'
// import VueRouter from 'vue-router'
import routes from "./routes"
import {is_login} from "../assets/js/login";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    if (to.name !== "login" && to.name !== "Home") {
        is_login(next)
    } else {
        next()
    }
})

export default router
