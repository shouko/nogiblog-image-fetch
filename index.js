const rp = require('request-promise')
const fs = require('fs')

const baseUrl = 'http://blog.nogizaka46.com/?p='
const apiUrl = 'https://apis.zaka46.tw/dcimg/'

Promise.all([1, 2, 3, 4, 5, 6, 7].map(function(e) {
    return rp(`${baseUrl}${e}`)
})).then(function(res) {
    var resText = res.join()
    var links = []
    var re = /<a href="http:\/\/dcimg.awalker.jp\/[^\/]+\/([^\"]+)">/g
    var m
    while (m = re.exec(resText)) {
        links.push(m[1])
    }
    return Promise.all(links.map(function(e) {
        return rp(`${apiUrl}${e}`)
    }))
}).then(function(res) {
    let message = `performed ${res.length} requests`
    console.log(message)
    fs.writeFileSync('result.txt', message)
})