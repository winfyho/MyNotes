export default {
    name: 'RouterView',
    // functional: true,
    props: {
        name: {
            type: String,
            default: 'default'
        }
    },
    render(_,{ props, children, parent, data }) {
        
        console.log("要渲染的组件是",data)
        const routerView = document.getElementsByClassName('router-view')[0]

        const template = `
            <h1>${data.title}</h1>
        `

        routerView.innerHTML = template
        
    }
}