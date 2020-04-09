function showToast(option) {
    
    var toast = document.getElementById("toast");
    var title = toast.getElementsByClassName("title")[0];
    var icon = toast.getElementsByClassName("icon")[0];
    var duration = option.duration || 800;

    title.innerHTML = option.title || "成功";
    icon.style.backgroundImage = 'url(../assets/icon_system/' + option.icon + '.png)' || 'url(../assets/icon_system/success.png)';

    toast.style.display = "block";
    
    setTimeout(function () {
        toast.style.display = "none";
    }, duration)
}
export default {
    showToast
}