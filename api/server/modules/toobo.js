/*let request = require('request');

let apiKey =  '93309befbaba2420988bf9fbcc438564';
let city = 'dijon';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err,response, body){
    if (err) {
        console.log('error:', error);
    } else {
        console.log('body:', body);
        let weather = JSON.parse(body)
        let message = `Il fait ${weather.main.temp} degrés à ${weather.name}.`;
        console.log (message);
    }
});