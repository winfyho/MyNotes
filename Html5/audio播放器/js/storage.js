function initStorage(){
    var storage = window.localStorage;
    if(storage._initDate){
        storage.setItem("_initDate",new Date());
    }
}

function getItem(key){
    
    var data = JSON.parse(window.localStorage.getItem(key));  
    // console.log(data);
    return data
}
function setItem(key,value){
    var data = JSON.stringify(value);
    window.localStorage.setItem(key,data);
    return value
}
function removeItem(key){
    window.localStorage.removeItem(key)
}
function update(target,newData){
    var oldData = getItem(target);
    for(let new_key in newData){
        console.log(new_key,newData[new_key]);
        let newItem = newData[new_key];
        for(let old_key in oldData){
            if(old_key === new_key){
                oldData[old_key] = newData[new_key];
            }else{
                oldData[new_key] = newData[new_key]
            }
        }

    }
    console.log(oldData);
}

export default{
    initStorage,
    getItem,
    setItem,
    update,
    removeItem
}