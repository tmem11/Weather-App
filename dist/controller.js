// function renderPlayers(teamPlayers){
//     const source = $('#player-template').html();
//         const template = Handlebars.compile(source);
//         let newHTML = template(teamPlayers);
//         $('.row').append(newHTML);   

// }
// const fetchData = function(){
//     $('.row').empty()
//     let teamName=$("#city-input").val()
//     console.log(teamName)
//     $.get(`api/${teamName}`,function(data){
//         renderPlayers({ players:data.teamPlayers})
//         console.log(data.teamPlayers)
//     })
// }
const apiManager = new ApiManager()
const renderer = new Renderer()

async function loadPage() {
    await apiManager.getDataFromDB()
    renderer.renderData(apiManager.getData())
}
const handleSearch = async function () {
    const cityName = $("#input").val()
    $("#input").val("")
    await apiManager.getCityData(cityName)
    renderer.renderData(apiManager.getData())
}
$('.cities').on('click', "#save-city", async function () {
    const cityName = $(this).closest(".card").find("h5").text()
    console.log(cityName)
    await apiManager.saveCity(cityName)
    renderer.renderData(apiManager.getData())
})
$('.cities').on('click', "#remove-city", async function () {
    const cityName = $(this).closest(".city").find("h5").text()
    await apiManager.removeCity(cityName) 
    await loadPage()

})


loadPage()
