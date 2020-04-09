import RouterView from "./view.js"

export default {
    name: 'RouterLink',

    init(router) {
        const routerLinks = document.getElementsByClassName('router-link')

        for (let i = 0; i < routerLinks.length; i++) {
            const link = routerLinks[i]
            link.onclick = function (e) {
                // console.log(e.target.getAttribute("to"))
                const path = e.target.getAttribute("to")
                // document.body.getAttribute("to")
                router.push({ path })
                router.routes.forEach(rt => {
                    if (rt.path === path) {
                        router.currentRoute = rt
                        RouterView.render(router,{
                            data:rt.component
                        })
                    }
                })
                console.log(router)
                
            }

        }

    }
}