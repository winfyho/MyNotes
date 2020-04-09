var calendar = {
    el: document.getElementById("calendar"),
    content: document.getElementById("calendar-content"),
    selectDate: null,
    showDate: {
        year: 2020,
        month: 1,
        day: 9
    },
    init() {
        this.initDays(this.showDate);
        this.handleSelectDate();
        this.handlePicker();
    },
    /**
     * 生成当前显示年月的天数
     */
    initDays(showDate) {
        let days = [];
        // 获取这个月的1号
        let curDay = new Date(showDate.year, showDate.month, 1)
        let curWeekday = new Date(showDate.year, showDate.month, 1).getDay() - 1;
        let deltDay = curWeekday > 0 ? (curWeekday % 7) : (7 + curWeekday);
        // 获取日历第一天的日期对象
        firstDay = new Date(+curDay - (deltDay) * 24 * 60 * 60 * 1000);
        for (let i = 0; i < 42; i++) {

            days.push(new Date(+firstDay));
            firstDay = +firstDay + 24 * 60 * 60 * 1000;
        }
        this.renderDays(days)

    },
    /**
     * 渲染日历样式，当前月，上一月下一月，今天，被选择日期
     */
    renderDays(days) {
        this.content.innerHTML = ""
        // console.log(days);
        for (let i = 0; i < days.length; i++) {
            const date = days[i];
            // new Date().getFullYear
            const date_year = date.getFullYear();
            const date_month = date.getMonth();
            const date_day = date.getDate();

            var dayDom = document.createElement('div');
            // document.documentElement.setAttribute();
            dayDom.setAttribute("date", `${date_year}-${date_month + 1}-${date_day}`);
            dayDom.innerHTML = date.getDate();
            if (date_month === this.showDate.month) {
                if (date_day === this.showDate.day) {
                    dayDom.className = "is-curday";
                    this.selectDate = dayDom;
                }
            } else {
                dayDom.className = "other-month";
            }



            this.content.appendChild(dayDom)

        }
    },
    /**
     * 绑定日期选择事件
     */
    handleSelectDate() {
        var days = this.content.children;
        for (let i = 0; i < days.length; i++) {
            var selectDate = this.selectDate;
            days[i].onclick = function () {
                this.classList.add("is-select");
                selectDate.classList.remove("is-select")
                selectDate = this;
                console.log(this.getAttribute("date"))
            }
        }
    },
    /**
     * 绑定年月切换事件
     */
    handlePicker() {
        var pickerBtns = this.el.getElementsByClassName("picker-btn");
        let arr = [""];
        for (let i = 0; i < pickerBtns.length; i++) {
            const pickerBtn = pickerBtns[i];
            var showDate = this.showDate;
            var _this = this;
            pickerBtn.onclick = function () {
                let event = this.getAttribute("event")
                if (event === "pre-year") {
                    showDate.year -=1;
                } else if (event === "pre-month") {
                    showDate.month -=1;
                } else if (event === "next-month") {
                    showDate.month +=1;

                } else if (event === "next-year") {
                    showDate.year +=1;
                }
                _this.showDate = showDate;
                var pickerDate = _this.el.getElementsByClassName("picker-date")[0];
                pickerDate.innerHTML = `${_this.showDate.year}年${_this.showDate.month+1}月`;
                console.log(`${_this.showDate.year}年${_this.showDate.month+1}月`);
                _this.init();
                
            }
        }
    }
}