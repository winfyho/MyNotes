new Vue({
    el: "#vue",
    data: {
        nav1: 'list1',
        nav2: 'list2',
        nav3: 'list3',
        nav4: 'list4',
        active: true,

    },
    methods: {
        // active: function() {
        //     this.nav1 = "active";
        // },
        // noactive: function() {
        //     this.nav1 = "list";
        // },
        // changeColor: function() {
        //     this.active = false;
        // }
    },
    computed: {
        obj: function() {
            return {
                active: this.active
            };
        }
    }
});