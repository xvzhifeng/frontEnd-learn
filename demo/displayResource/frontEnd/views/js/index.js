
let goto_page = (url) => {
    console.log(url);
    $("#dr-content").load(url, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success")
            console.log("外部内容加载成功!");
        if (statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
}