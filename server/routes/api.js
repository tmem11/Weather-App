const express = require('express')
const router = express.Router()
const City = require('../model/City')

const axios = require('axios').default;
const url = "https://api.openweathermap.org/data/2.5/weather?q="
const apiKey = "d927ab8526a956962bdcb2e11429a89b"
const imgUrl = "http://openweathermap.org/img/w/"



// const urllib = require('urllib');

router.get('/city/:cityName', async (req, res) => {
    let cityName = req.params.cityName
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    const data = await axios.get(`${url}${cityName}&APPID=${apiKey}`)
    const cityData = data.data
    const myCity = new City({
        name: cityData.name,
        temperature: cityData.main.temp,
        condition: cityData.weather[0].description,
        conditionPic: `${imgUrl}${cityData.weather[0].icon}.png`,
    }
    )
    res.send(myCity)
})
router.get('/cities', async (req, res) => {
    res.send(await City.find({}))


})
router.post('/city', async (req, res) => {
    const myCity = req.body
    // console.log((await (City.find({name:myCity.name}).exec())).length)
    if((await (City.find({name:myCity.name}).exec())).length==0){
        const city = new City(myCity)
        city.save()
        res.send(myCity)
    }
    else{
        res.send(`${myCity.name} is already exist`)
    }
})
router.delete('/city/:cityName', async (req, res) => {
    let cityName = req.params.cityName
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    
    res.send(await City.find({name:cityName}).deleteOne())
})


module.exports = router
