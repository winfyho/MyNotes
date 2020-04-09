export function css(el, options) {
    // css(dom,'width')
    // css(dom,{width:10px,height:10px})

    let transformAttr = [
        'rotate', 'rotateX', 'rotateY', 'rotateZ',
        'skewX', 'skewY', 'scale', 'scaleX', 'scaleY',
        'translateX', 'translateY', 'translateZ',
    ]

    const type = op => {
        let str = Object.prototype.toString.call(op)
        return str.match(/\[object (.*)\]/)[1].toLowerCase()
    }

    const isGet = type(options) === 'object' ? false : true

    if (isGet) {
        // 获取样式
        let attribute = options
        if (transformAttr.includes(attribute)) {
            return transform(attribute)
        } else {
            return window.getComputedStyle(el)[attribute]
        }

    } else {

        const attrKeys = Object.keys(options)
        for (let attr of attrKeys) {
            el.style[attr] = options[attr]
            console.log('设置样式', attr, el.style[attr])
        }
        transform(attrKeys)
    }

    // 获取设置css3属性
    function transform(payload) {
        el.transform = el.transform || {}

        if (isGet) {
            let attr = payload

            if (!Object.keys(el.transform).includes(attr)) {
                return attr === 'scale' ? 1 : 0
            }
            return el.transform[attr]
        } else {
            let attrKeys = payload
            for (const attr of attrKeys) {
                if (transformAttr.includes(attr)) {
                    el.transform[attr] = options[attr]
                }
            }
            console.log('el-transform', el.transform)
            let str = ''
            for (let attr in el.transform) {
                switch (attr) {
                    case 'rotate':
                    case 'rotateX':
                    case 'rotateY':
                    case 'rotateZ':
                    case 'skewX':
                    case 'skewY':
                        //str+='rotate(60deg)'
                        str += attr + `(${el.transform[attr]}deg) `;
                        break;
                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                        str += attr + `(${el.transform[attr]}) `;
                        break;
                    case 'translateX':
                    case 'translateY':
                    case 'translateZ':
                        str += attr + `(${el.transform[attr]}px) `;
                        break;
                }
            }
            el.style.transform=str;
            console.log('设置transform',el.style.transform)
        
        }



    }
}
// document.body.getAttribute