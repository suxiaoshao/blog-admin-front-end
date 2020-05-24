const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../views/Home")
    },
    {
        path: "/jpg",
        name: "jpg",
        component: () => import("../views/jpg")
    },
    {
        path: "/wallpaper",
        name: "wallpaper",
        component: () => import("../views/wallpaper")
    },
    {
        path: "/bilibili_show/:page",
        name: "bilibili_show",
        component: () => import("../views/bilibili_show")
    },
    {
        path: "/bilibili_save",
        name: "bilibili_save",
        component: () => import("../views/bilibili_save")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login")
    },
    {
        path: "/blog_list",
        name: "blog_list",
        component: () => import("../views/blog_list")
    },
    {
        path: "/edit",
        name: "edit",
        component: () => import("../views/edit")
    },
    {
        path: "/article",
        name: "article",
        component: () => import("../views/article")
    }
];
export default routes
