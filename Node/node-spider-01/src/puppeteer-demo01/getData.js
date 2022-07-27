const puppeteer = require('puppeteer')

let main = async () => {
    // 1. 打开浏览器
    const browser = await puppeteer.launch({executablePath:`C:/A-Install/Win_x64_972766_chrome-win/chrome-win/chrome.exe`})
    
    console.log("browser")
    // 2. 新建一个标签页
    const page = await browser.newPage()
    console.log("page")
    await page.setViewport({width:1920,height: 1080})
    // 3. 输入地址敲回车
    await page.goto('https://www.amazon.cn/dp/B007II23XO/ref=z_cn?th=1&psc=1')
    let delivery_span = await page.$eval(`div[id='delivery-block-ags-dcp-container_0']`, e => e.innerText)
    // let delivery_fee = documentHandle.getElementById('delivery-block-ags-dcp-container_0').getElementsByTagName('span')[0].getAttribute('data-csa-c-delivery-price')
    // let add_fee = documentHandle.getElementById('ags_shipping_import_fee').text
    let reg_get_add = /\¥[.\d]*/;
    let add_fee = await page.$eval(`span[id='ags_shipping_import_fee']`, e=> e.outerHTML)
    console.log(`delivery_fee : ${reg_get_add.exec(delivery_span)}, taxation : ${reg_get_add.exec(add_fee)} ; `)
    // 4. 操作：
    //    对加载完毕的网页进行截图
    await page.screenshot({ path: '100016777690.png' })

    // 5. 关闭浏览器
    await browser.close()
}

main()