Vue.component("greet", {
    template: '<p>{{name}}</p>',
    data: function() {
        return {
            name: 'heyonghui'
        }
    },
    methods: {
        change: function() {
            this.name = 'heheeh';
        }
    }
})
new Vue({
    el: "#vue"
});