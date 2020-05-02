const DARK_SKY_ENDPOINT = "https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/"
const PROXY = 'https://cors-anywhere.herokuapp.com/'

document.onload = initApp()

/**
 * Initialize the weather app.
 * Get the current latitude & longitude.
 * Get the current Location name.
 * Show weather status.
 */

function initApp() {

    showWeather('30.007414', '31.491318')
}

function getWeather(data) {
    document.querySelector('#weather-status').textContent = data.currently.summary
    document.querySelector('#weather-status-description').textContent = data.hourly.summary
    document.querySelector('#date').textContent = moment(new Date(data.currently.time * 1000)).format('LL')
    document.querySelector('#weather-temperature').textContent = Math.round(data.currently.temperature)
    document.querySelector('#weather-temperature-high').textContent = Math.round(data.daily.data[0].apparentTemperatureHigh)
    document.querySelector('#weather-temperature-low').textContent = Math.round(data.daily.data[0].apparentTemperatureLow)
    document.querySelector('#icon').innerHTML = `<i class="wi wi-forecast-io-${data.currently.icon}">`
}

function getWeatherElementTime(data, isHourly) {
    if (isHourly) {
        return moment(new Date(data.time * 1000)).format('MMMM Do YYYY, h') !== moment(new Date()).format('MMMM Do YYYY, h')
            ? moment(new Date(data.time * 1000)).format('HH:mm')
            : 'Now'
    } else {

        return moment(new Date(data.time * 1000)).format('MMMM Do YYYY') !== moment(new Date()).format('MMMM Do YYYY')
            ? moment(new Date(data.time * 1000)).format('dddd')
            : 'Today'
    }
}

function weatherElement(data, weatherHtmlElement, isHourly) {
    weatherHtmlElement.classList.remove('hidden')
    weatherHtmlElement.querySelector('.hour').innerHTML = getWeatherElementTime(data, isHourly)
    weatherHtmlElement.querySelector('.hourly-weather-icon').innerHTML = `<i class="wi wi-forecast-io-${data.icon}">`
    weatherHtmlElement.querySelector('.mini-degree').innerHTML = (isHourly)
        ? Math.round(data.temperature)
        : Math.round(data.temperatureHigh)
    return weatherHtmlElement
}

function getHourlyWeather(data) {
    let forecastHourly = document.querySelector('#hourly-content')
    data.forEach(el => {
        let weatherHtmlElement = forecastHourly.querySelector('.box').cloneNode(true)
        forecastHourly.appendChild(weatherElement(el, weatherHtmlElement, true))
    })
}

function getDailyWeather(data) {
    let forecastDaily = document.querySelector('#daily-content')
    data.forEach(el => {
        let weatherHtmlElement = forecastDaily.querySelector('.box').cloneNode(true)
        forecastDaily.appendChild(weatherElement(el, weatherHtmlElement, false))
    })
}

function showWeather(lat, long) {
    axios.get(`${PROXY}${DARK_SKY_ENDPOINT}${lat},${long}`)
        .then(function (response) {
            getWeather(response.data)
            getHourlyWeather(response.data.hourly.data)
            getDailyWeather(response.data.daily.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}

