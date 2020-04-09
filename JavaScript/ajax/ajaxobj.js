const Ajax = {
    get({url,query}) {
        return new Promise((resolve, reject) => {
            var http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    resolve(JSON.parse(http.responseText))
                }
            }
        })
    },
    post({url,query}) {
        return new Promise((resolve, reject) => {
            var http = new XMLHttpRequest();
            http.open("POST", url, true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.send(query);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    resolve(JSON.parse(http.responseText))
                }
            }
        })

    }
}
export default Ajax