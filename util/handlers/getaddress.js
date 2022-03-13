const { admin, db } = require("../admin");
const puppeteer = require('puppeteer');

exports.getaddress = async(req, res) => {
    const browser = await puppeteer.launch({ headless: true }); // for test disable the headlels mode,
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 926 });
    var lat = req.query.lat;
        var lon = req.query.lon; 
    await page.goto("https://www.google.com/maps/place/" + lat + "," + lon,{waitUntil: 'networkidle0'});
    /** @type {string[]} */
    var addressInfo = await page.evaluate(()=>{
        var address = document.getElementsByClassName('Yr7JMd-pane-hSRGPd')[2].innerHTML;
        return address;
    });

    console.log(addressInfo);
    browser.close();
    return res.status(202).json('success');
}
