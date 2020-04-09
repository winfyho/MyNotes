import {routes} from "./router.js"
window.onhashchange = function(e){
    // console.log(location.hash,e);
    let path = location.hash.replace('#','/')
    let route = null
    routes.forEach(rt => {
        if(rt.path === path){
            route = rt
        }
    })
    changeRouteByHash(route)
}

function changeRouteByHash(route){
    console.log(route);
    const _routerView = document.getElementById('router-view')
    _routerView.innerText = route.name
}
