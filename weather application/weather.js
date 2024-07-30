
const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIkey = 'bf46ec9ad04f876a85ebafa2d9013273';
    const city = document.querySelector('.search input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temparature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent === city) {
                return;
            } else {
                cityHide.textContent = city;
                container.style.height = '600px';
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.jpg';
                        break;
                    case 'Rain':
                        image.src = 'images/rainycloud.jpg';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.avif';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.jpg';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.jpg';
                        break;
                    default:
                        image.src = 'images/cloudnew.webp';
                }
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            }
        });
});
