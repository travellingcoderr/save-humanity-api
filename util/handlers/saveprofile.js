const puppeteer = require("puppeteer");
const { admin, db } = require("../admin");

// saveprofile
// get phone, la, long, address
// save it to database 

exports.saveprofile = async(req, res) => {
    
    try{        
                
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1000, height: 926 });
        var lat = req.query.lat;
        var lon = req.query.lon;
        var phone = req.query.phone;        
        await page.goto("https://www.google.com/maps/place/" + lat + "," + lon,{waitUntil: 'networkidle0'});

        var addressInfo = await page.evaluate((response)=>{
            return document.getElementsByClassName('Yr7JMd-pane-hSRGPd')[2].innerHTML;
        });

        browser.close();

        // Add to odatabase 
        const locRefs = db.collection('Locations');
        locRefs.add({
            "Phone": phone,           
            "Lat": lat,
            "Long": lon,
            "Address": addressInfo
        }).then(() =>{
            return res.status(201).json('success');
        });

        // res.send(addressInfo);

    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .json({ general: "Something went  in getaddress, please try again" + res});          
    }
}
