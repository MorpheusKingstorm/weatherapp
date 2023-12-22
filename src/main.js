import { getWeatherByCity } from "./apiService.js";

const viewElems = {};

const getDOMElem = id => {
    return document.getElementById(id);
}

const connectHTMLElems = () => {
    viewElems.mainContainer = getDOMElem("mainContainer");
    viewElems.weatherSearchView = getDOMElem("weatherSearchView");
    viewElems.weatherForecastView = getDOMElem("weatherForecastView");

    viewElems.searchInput = getDOMElem("searchInput");
    viewElems.searchButton = getDOMElem("searchButton");

    viewElems.weatherCity = getDOMElem("weatherCity");
    viewElems.weatherIcon = getDOMElem("weatherIcon");

    viewElems.weatherCurrentTemp = getDOMElem("weatherCurrentTemp");
    viewElems.weatherMaxTemp = getDOMElem("weatherMaxTemp");
    viewElems.weatherMinTemp = getDOMElem("weatherMinTemp");

    viewElems.returnToSearchButton = getDOMElem("returnToSearchButton");
}

const setupListeners = () => {
    viewElems.searchInput.addEventListener("keydown", onEnterSubmit);
    viewElems.searchButton.addEventListener("click", onClickSubmit);
    viewElems.returnToSearchButton.addEventListener("click", switchViewAnimation);
}

const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = event => {
    if(event.key === "Enter") {
        let query = viewElems.searchInput.value;
        getWeatherByCity(query).then(data => {
            displayWeatherData(data)
        });
    }
};

const onClickSubmit = () => {
    let query = viewElems.searchInput.value;
    getWeatherByCity(query).then(data => {
        displayWeatherData(data)
    });
};

const displayWeatherData = data => {
    switchViewAnimation();

    const weather = data["main"];
    console.log(data);

    viewElems.weatherCity.innerText = data["name"];
    viewElems.weatherIcon.src = `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`;
    viewElems.weatherIcon.alt = data["weather"][0]["description"];

    const currentTemp = weather["temp"];
    const maxTemp = weather["temp_max"];
    const minTemp = weather["temp_min"];

    viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp} ºC`;
    viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} ºC`;
    viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} ºC`;
}

const fadeInOut = () => {
    if(viewElems.mainContainer.style.opacity === "1" || viewElems.mainContainer.style.opacity === "") {
        viewElems.mainContainer.style.opacity = "0"
    }
    else {
        viewElems.mainContainer.style.opacity = "1"
    }
}

const switchView = () => {
    if(viewElems.weatherSearchView.style.display === "none") {
        viewElems.weatherSearchView.style.display = "flex";
        viewElems.weatherForecastView.style.display = "none";
    }
    else {
        
        viewElems.weatherSearchView.style.display = "none";
        viewElems.weatherForecastView.style.display = "flex";
    }
}

const switchViewAnimation = () => {
    fadeInOut();
    setTimeout(() => {
        switchView();
        fadeInOut();
    }, 500);
}

document.addEventListener('DOMContentLoaded', initializeApp);