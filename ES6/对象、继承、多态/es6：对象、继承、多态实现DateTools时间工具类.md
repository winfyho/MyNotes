# 实现DateTools时间工具类


## 导出class
``` js
export class DateTools {
    constructor(date) {
        const type = typeof date
        let nowDate = new Date(date);
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        let day = nowDate.getDate();
        let hour = nowDate.getHours();
        let minute = nowDate.getMinutes();
        let second = nowDate.getSeconds();

        this.date = {
            str: `${year}-${month}-${day}`,
            stamp: new Date(date).getTime(),
            year,
            month,
            day,
            hour,
            minute,
            second
        }
    }
    getDateAll() {
        console.log("dateAll", this.date);
        return this.date
    }

}

export class DateFormat extends DateTools {
    constructor(date) {
        super(date)
        this.format = "format"

        let hour = this.date.hour
        let minute = this.date.minute < 10 ? ('0' + this.date.minute) : this.date.minute
        let second = this.date.second < 10 ? ('0' + this.date.second) : this.date.second

        this.date.timeStr = `${hour}:${minute}:${second}`
    }
    getDateStr() {
        console.log("date", this.date.str);
        return this.date.str
    }
    getHourMinute() {
        let minute = this.date.minute < 10 ? ('0' + this.date.minute) : this.date.minute
        console.log(`${this.date.hour}:${minute}`);
        return `${this.date.hour}:${minute}`
    }
    getTimeStr() {

        console.log("time", this.date.timeStr);
        return this.date.timeStr
    }
    getDateTimeStr() {
        console.log(`${this.date.str} ${this.date.timeStr}`);
        return `${this.date.str}-${this.date.timeStr}`
    }
}


```

## 引入class
``` html
<script type="module">
    import {DateFormat} from "./tools.js"

    const dateFormat = new DateFormat(new Date())
    
</script>
```