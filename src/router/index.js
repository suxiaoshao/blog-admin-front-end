import Vue from 'vue'
import routes from "./routes"
import VueRouter from 'vue-router'
import {is_login} from "../util/login";

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
