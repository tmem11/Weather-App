class ApiManager {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        const cities =await $.get('/cities')
        this.cityData = cities
        console.log(this.cityData)
        
       
    }
    getData(){
        return this.cityData
    }
    async getCityData(cityName) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        const res = await $.get(`/city/${cityName}`)
        this.cityData.push(res)
    }
    async saveCity(cityName) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        let newCity = {}
        for (let city of this.cityData) {
            console.log(city.name)
            console.log(cityName)
            if (city.name === cityName) {
                newCity = city 
                       
            }
        }
        // console.log(newCity)
        await $.post(`/city/`, newCity)

    }
    async removeCity(cityName) {
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        await axios.delete(`/city/${cityName}`)
    }

}