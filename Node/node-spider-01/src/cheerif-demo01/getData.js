const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio') // 类似jq，在node环境下操作dom

const getPage = async (asin) => {
    const { data } = await axios.get(`https://www.amazon.cn/dp/${asin}/ref=z_cn?th=1&psc=1`, {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36'
        }
    })
    return data
}
const main = async () => {
    let asin_no = 'B0089K1I5O'
    let no_1 = 'B007II23XO'
    const pageData = await getPage(no_1)
    fs.writeFileSync(`${__dirname}/page.html`, pageData,'utf-8')
    const $ = cheerio.load(pageData)
    console.log($("#delivery-block-ags-dcp-container_0").html())
    console.log($("#delivery-block-ags-dcp-container_0 span").attr('data-csa-c-delivery-price'))
    let dilivery_fee = $("#delivery-block-ags-dcp-container_0").text().trim()
    let add_fee = $('#ags_shipping_import_fee').text().trim()
    let normal_fee = $('#ags_local_price').text().trim()
    console.log(`d: ${dilivery_fee}, add_file: ${add_fee}, price: ${normal_fee}`)
}
main()