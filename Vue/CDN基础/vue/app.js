new Vue({
    el: "#vue",
    data: {
        username: "请输入用户名",
        password: "请输入密码",


    },
    methods: {
        getUP: function() {
            this.username = this.$refs.username.value;
            this.password = this.$refs.password.value;

        },
        input: function() {
            console.log('input' + 'keydown');
        },
        func1: function() {
            console.log('func1');
        },

    }
});
// el: Element需要获取的元素
// data: 数据存储 {{ data }}
// methods: 存储方法
// v-bind: 属性名
// v-html="值"
// v-on:事件名="function"
// 或者 @事件名="function"