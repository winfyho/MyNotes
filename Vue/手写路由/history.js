function changeRoute(route){
    console.log(route.dataset);
    let path = route.dataset.path
    let name = route.dataset.name
    let state = {
        name,
        path,
        component:{}
    }
    window.history.pushState(state,"首页",path)
    changeView({
        name
    })
}

function changeView(view){
    const _routerView = document.getElementById('router-view')
    _routerView.innerText = view.name
}

window.addEventListener('popstate',(e) => {
    console.log(e.state);
    changeView(e.state)
    
})