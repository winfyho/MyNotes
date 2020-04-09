export default class _VueRouter{
    constructor(options){
        this.routes = options.routes || []
        this.mode = options.mode || 'history'
        this.currentRoute = null
        this.linkActiveClass = 'router-link-active'
    }
    push(options) {
        let { path, query = null, params = null } = options

        window.history.pushState({path}, "首页", path)

    }
    replace(options) {
        let { path, query = null, params = null } = options

        window.history.replaceState({path}, "首页", path)

    }
    
}

