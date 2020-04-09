let file = {

    data : [],

    init(dom) {
        console.log(new Date().getTime())
        var fileInput = dom
        var _this = this;
        fileInput.onchange = function () {
            let list = fileInput.files;

            for (let i = 0; i < list.length; i++) {

                _this.data.push({
                    src: list[i].name,
                    size: list[i].size,
                    addDate: new Date().getTime(),
                    type: list[i].type
                })

            }
            console.log(_this.data)
        }
    },

    getData(){
        return this.audioList
    }
}

export {
    file
}