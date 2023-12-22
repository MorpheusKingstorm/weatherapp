import { getWeatherByCity } from "./apiService.js";
import { mapListToDOMElements } from "./domActions.js";

class WeatherApp {
    constructor() {
        this.viewElems = {};
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll("[id]")).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener("keydown", this.handleSubmit);
        this.viewElems.searchButton.addEventListener("click", this.handleSubmit);
        this.viewElems.returnToSearchButton.addEventListener("click", this.switchViewAnimation);
    }

    handleSubmit = event => {
        if (event.type === 'click' || event.key === 'Enter') {
            let query = this.viewElems.searchInput.value;
            getWeatherByCity(query).then(data => {
                this.viewElems.searchInput.style.borderColor = "black";
                this.displayWeatherData(data);
                this.switchViewAnimation();
                this.viewElems.searchInput.value = "";
                this.viewElems.searchInputError.innerText = "";
            }).catch(() => {
                this.viewElems.searchInputError.innerText = "Typed city does not exist in our database."
                this.viewElems.searchInput.style.borderColor = "red";
            });
        }
    }

    fadeInOut = () => {
        if(this.viewElems.mainContainer.style.opacity === "1" || this.viewElems.mainContainer.style.opacity === "") {
            this.viewElems.mainContainer.style.opacity = "0";
        }
        else {
            this.viewElems.mainContainer.style.opacity = "1";
        }
    }

    switchView = () => {
        if(this.viewElems.weatherSearchView.style.display === "none") {
            this.viewElems.weatherSearchView.style.display = "flex";
            this.viewElems.weatherForecastView.style.display = "none";
        }
        else {
            this.viewElems.weatherSearchView.style.display = "none";
            this.viewElems.weatherForecastView.style.display = "flex";
        }
    }

    switchViewAnimation = () => {
        this.fadeInOut();
        setTimeout(() => {
            this.switchView();
            this.fadeInOut();
        }, 500);
    }

    displayWeatherData = data => {
        const weather = data["main"];
    
        this.viewElems.weatherCity.innerText = data["name"];
        this.viewElems.weatherIcon.src = `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`;
        this.viewElems.weatherIcon.alt = data["weather"][0]["description"];
    
        const currentTemp = weather["temp"];
        const maxTemp = weather["temp_max"];
        const minTemp = weather["temp_min"];
    
        this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp} ºC`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} ºC`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} ºC`;
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp);
