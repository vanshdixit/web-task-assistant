// const cityName = document.getElementById('cityName');
// const country = document.getElementById('country');
// const timeZone = document.getElementById('timeZone');
// const coords = document.querySelector('.coord').querySelectorAll('p');
// const weatherType = document.getElementById('weatherType');
// const weatherDesc = document.getElementById('weatherDesc');
// const temp = document.querySelector('.temp').querySelectorAll('p');
// const visibility = document.getElementById('visibility');
// const wind = document.querySelector('.wind').querySelectorAll('p');
// const city = document.getElementById('weatherImg');
// const clouds = document.getElementById('clouds');

// function getdata(){
//     let url = 'https://api.openweathermap.org/data/2.5/weather?q=india&appid=cfc36574ecb2d7888794314b0e9ea97b';
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onload = function(){
//         if(this.status === 200){
//             let data = JSON.parse(this.responseText);
//             cityName.textContent = `Location : ${data.name}`;
//             country.textContent = `Country: ${data.sys.country}`;
//             coords[0].textContent = `lon : ${data.coords.lon}`;
//             coords[1].textContent = `lat : ${data.coords.lat}`;
            
//         }else{
//             alert('Some kind of error occured while completing the process');
//         }
//     }
//     xhr.send();
// }
// getdata();

const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const timeZone = document.getElementById("timeZone");
const coords = document.querySelector(".coord").querySelectorAll("p");
const weatherType = document.getElementById("weatherType");
const weatherDesc = document.getElementById("weatherDesc");
const temp = document.querySelector(".temp").querySelectorAll("p");
const visibility = document.getElementById("visibility");
const wind = document.querySelector(".wind").querySelectorAll("p");
const clouds = document.getElementById("clouds");
const weatherImg = document.getElementById("weatherImg");



function getData(location) {
    let loc = location;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            cityName.textContent = `Location : ${data.name}`;
            country.textContent = `Country : ${data.sys.country}`;
            timeZone.textContent = `Timezone : ${data.timezone}`;
            coords[0].textContent = `Longitude : ${data.coord.lon}`;
            coords[1].textContent = `Latitude : ${data.coord.lat}`;
            weatherType.textContent = `Weather type : ${data.weather[0].main}`;
            weatherDesc.textContent = `Weather description : ${data.weather[0].description}`;
            weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            temp[0].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
            temp[1].textContent = `But it feels like ${ktc(data.main.feels_like)}`;
            temp[2].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
            temp[3].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
            temp[4].textContent = `Pressure : ${data.main.pressure}`;
            temp[5].textContent = `Humidity : ${data.main.humidity}`;
            visibility.textContent = `Visibility : ${data.visibility}`;
            wind[0].textContent = `Wind speed : ${data.wind.speed}`;
            wind[1].textContent = `Wind deg : ${data.wind.deg}`;


            document.querySelector(".searchBox").classList.add("onSearch");
            document.querySelector(".content").classList.add("onContent");

        } else {
            alert('Some error occured');
        }
    }

    xhr.send();
}


function ktc(k) {
    k = (k - 273.15);
    return k.toFixed(2);
}


const searchBtn = document.querySelector(".searchBox").querySelector("button");
const searchBox = document.querySelector(".searchBox").querySelector("input");



searchBox.addEventListener("keypress", (e) => {
    if (e.which === 13) {
        let searchVal = searchBox.value;
        if (searchVal === "") {
            alert("Enter location name in the search box")
        } else if (searchVal !== "") {
            searchVal = searchVal.split("");
            searchVal[0] = searchVal[0].toUpperCase();
            searchVal = searchVal.join("");
            getData(searchVal);
        }
    }
})

searchBtn.addEventListener("click", () => {
    let searchVal = searchBox.value;
    if (searchVal === "") {
        alert("Enter location name in the search box")
    } else if (searchVal !== "") {
        searchVal = searchVal.split("");
        searchVal[0] = searchVal[0].toUpperCase();
        searchVal = searchVal.join("");
        getData(searchVal);
    }
})