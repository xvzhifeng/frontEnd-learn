
/**
 * node 不支持fetch
 */
function test() {
    fetch("http://127.0.0.1:10111/menu/getMenu")
    .then(response => response.json)
    .then(data => console.log(data))
    .catch(error => {
        console.error("There was an error", error)
    })
}

test()