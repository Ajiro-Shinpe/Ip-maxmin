const express = require('express');
const Reader = require('@maxmind/geoip2-node').Reader;

const app = express();
const port = 3000;

app.use('/ipinfo/?:ip', (req,res) => {
    const mydata = {
        name: 'John Doe',
        age: 30,
        request : req.params
    }
    if(!isValidIP(req.params.ip)){
        mydata.information = 'Invalid IP address'
        res.send(mydata);
        return;  // exit the function here to prevent further processing
    }
    try {
     
Reader.open('city.mmdb').then(reader => {
    const response = reader.city(req.params.ip ?? '111.88.27.29');
    mydata.information = response
    res.send(mydata);
  });
     
    } catch (error) {
        req.send(error)
    console.error('Error:', error);      
    }
  
});
// Start the server
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});

function isValidIP(ip) {
    // Regular expression for validating IPv4 addresses
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;

    return ipv4Pattern.test(ip);
}
