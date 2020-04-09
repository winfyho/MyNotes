import VueRouter from "./VueRouter.js"
import RouterLink from "./link.js"
import RouterView from "./view.js"
const router =  new VueRouter({
    routes: [
        {
            path:'/vue-router/index.html',
            redirect:'/home'
        },
        {
            path: '/home',
            component: {
                title:"首页"
            },
            name: "首页"
        },
        {
            path: '/profile',
            component: {
                title:"个人页"
            },
            name: "个人页"
        },
        {
            path: '/about',
            component: {
                title:"帮助页"
            },
            name: "帮助页"
        }

    ],
    currentRoute:null,
    mode:'history'
})
router.routes.forEach(rt => {
    if (rt.redirect && window.location.pathname === rt.path) {
        router.push({path:rt.redirect})
    }
})

window.addEventListener('popstate',(e) => {
    // console.log(e,e.state.path);
    router.routes.forEach(rt => {
        if (rt.redirect && window.location.pathname === rt.path) {
            router.push({path:rt.redirect})
        }else if (rt.path === e.state.path) {

            RouterView.render(router,{
                data:rt.component
            })
        }
    })
    
})
RouterLink.init(router)
// RouterView.render()
console.log("init router",router)



