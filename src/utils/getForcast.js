const request = require("postman-request");

const getForcast = (location, callback) => {    
    const url =`https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${encodeURI(location)}`;
    
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback("unable to connect", undefined);
        }else if(body.error){
            callback("unable to find location", undefined);
        }else{
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                location: body.location.name
            })
        }
    })
}

module.exports = getForcast