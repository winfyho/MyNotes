function createFastScollTo(dom, config) {
    // var btnUl = document.getElementsByClassName('btn-list')[0];
    var btnUl = dom;
    var config = config;
    btnUl.style.position = "fixed";
    btnUl.style.right = config.right + 'px';
    btnUl.style.bottom = config.bottom + 'px';
    initBtnList();

    function initBtnList() {
        for (let i = 0; i < config.scollLen.length; i++) {
            let btn = document.createElement('div');
            btn.style.width = config.width + 'px';
            btn.style.height = config.height + 'px';
            btn.style.border = "1px solid #777";
            btn.style.cursor = "pointer";
            btn.style.lineHeight = config.height + 'px';
            btn.innerHTML = i + 1;

            btn.onclick = function() {
                window.scrollTo(0, config.scollLen[i]);
                clearColor();
                btn.style.backgroundColor = config.backgroundColor;
                btn.style.color = "#fff";
            }
            btnUl.appendChild(btn);
        }
    }

    function clearColor() {
        var btnList = btnUl.children;
        for (let i = 0; i < btnList.length; i++) {
            btnList[i].style.backgroundColor = "#fff";
            btnList[i].style.color = "#000";

        }
    }
}