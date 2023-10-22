var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var cityOutput = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var favoriteBtn = document.querySelector('#favorite-btn');
var favoriteCitiesList = document.querySelector('#favorite-cities-list');

var favoriteCities = [];

// Function to fetch weather for a specific city
function fetchWeatherForCity(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=03dd4ebadcdb8bf2021db1e407b9f815')
        .then(res => res.json())
        .then(data => {
            var nameval = data['name'];
            var descrip = data['weather'][0]['description'];
            var temperature = data['main']['temp'];
            var windspeed = data['wind']['speed'];

            cityOutput.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${((temperature - 273).toFixed(3))} C</span>`;
            description.innerHTML = `Sky Conditions: <span>${descrip}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windspeed} km/h</span>`;

            favoriteBtn.disabled = false;
            if (favoriteCities.includes(nameval)) {
                favoriteBtn.textContent = 'Remove from Favorites';
            } else if (favoriteCities.length >= 3) {
                favoriteBtn.textContent = 'Add to Favorites';
                favoriteBtn.disabled = true;
            } else {
                favoriteBtn.textContent = 'Add to Favorites';
            }

            setWeatherBackground(descrip); // Set background image based on weather description
        })
        .catch(err => {
            alert("City not found or there was an issue fetching data.");
            console.error('Error:', err);
        });
}

favoriteCitiesList.addEventListener('click', function (e) {
    if (e.target && e.target.nodeName == "LI") {
        var cityName = e.target.textContent;
        inputvalue.value = cityName; // Set the input value to the selected city's name
        fetchWeatherForCity(cityName); // Fetch weather for the selected favorite city
    }
});

btn.addEventListener('click', function () {
    fetchWeatherForCity(inputvalue.value);
});

favoriteBtn.addEventListener('click', function () {
    var cityName = cityOutput.innerText.split(' ')[2];
    toggleFavorite(cityName);
});

var favoriteCities = [];

// Function to toggle favorite status for a city
async function toggleFavorite(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=03dd4ebadcdb8bf2021db1e407b9f815`);
        const data = await response.json();
        if (data.cod === 200) {
            if (favoriteCities.length < 3 && !favoriteCities.includes(cityName)) {
                favoriteCities.push(cityName); // Add city name to the favorites array
            } else if (favoriteCities.includes(cityName)) {
                const index = favoriteCities.indexOf(cityName);
                favoriteCities.splice(index, 1); // Remove city name from the favorites array
            } else {
                alert('You can only have 3 favorite cities!');
                return; // Exit the function if trying to add more than 3 favorites
            }
            inputvalue.value = cityName; // Set the input value to the selected city's name
            updateFavoritesList();
            updateFavoriteButtonState();
        } 
    } catch (error) {
        alert('Error fetching data for the city.');
        console.error('Error:', error);
    }
}


function updateFavoritesList() {
    favoriteCitiesList.innerHTML = '';
    favoriteCities.forEach(function (city) {
        var listItem = document.createElement('li');
        listItem.textContent = city;
        favoriteCitiesList.appendChild(listItem);
    });
}

function updateFavoriteButtonState() {
    var cityName = cityOutput.innerText.split(' ')[2];
    if (favoriteCities.includes(cityName)) {
        favoriteBtn.textContent = 'Remove from Favorites';
    } else {
        favoriteBtn.textContent = 'Add to Favorites';
    }
    favoriteBtn.disabled = favoriteCities.length >= 3 && !favoriteCities.includes(cityName);
}

function setWeatherBackground(weatherDescription) {
    const body = document.body;
    switch (weatherDescription.toLowerCase()) {
        case 'clear sky':
            body.style.backgroundImage = 'url(https://media.istockphoto.com/id/162428248/photo/cloudscape.jpg?s=612x612&w=0&k=20&c=9yNkLzvPtJouuJw7XRuvKQ0rD9Dh_UksrKKlvtEpKMg=)';
            break;
        case 'scattered clouds':
            body.style.backgroundImage='url(https://static.vecteezy.com/system/resources/previews/015/127/111/large_2x/scattered-clouds-in-the-sky-indicating-a-change-in-weather-free-photo.jpg)';
            break;
         case 'broken clouds':
            body.style.backgroundImage = 'url(https://images.freeimages.com/images/large-previews/e83/broken-clouds-1537880.jpg)';
            break;
        case 'overcast clouds':
                body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3ZlcmNhc3QlMjBza3l8ZW58MHx8MHx8fDA%3D)';
                break;
        case 'few clouds':
                body.style.backgroundImage = 'url(https://media.istockphoto.com/id/492866927/photo/few-little-fluffy-white-clouds-in-blue-sky.jpg?s=612x612&w=0&k=20&c=0BeCgArlnZP5ugmn4qz-gNOnGNd7wucrj1sB-CizI-Q=)';
                break;
        case 'rain':
            body.style.backgroundImage = 'url(https://www.zigya.com/blog/wp-content/uploads/rain_cloudy_sky_landscapes_hd-wallpaper-403777.jpg)';
            break;
        case 'light rain':
                body.style.backgroundImage = 'url(https://www.zigya.com/blog/wp-content/uploads/rain_cloudy_sky_landscapes_hd-wallpaper-403777.jpg)';
                break;
        case 'snow':
            body.style.backgroundImage = 'url(https://hips.hearstapps.com/clv.h-cdn.co/assets/16/49/2048x1365/gallery-1481299207-gettyimages-553790585-1.jpg?resize=640:*)';
            break;
        case 'mist':
            body.style.backgroundImage = 'url(https://miro.medium.com/v2/resize:fit:1200/1*PzfE18BkPw6luo7YW7c9XQ.jpeg)';
            break;
        case 'haze':
            body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1524252500348-1bb07b83f3be?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9nZ3klMjB3ZWF0aGVyfGVufDB8fDB8fHww)';
            break;
        case 'moderate rain':
            body.style.backgroundImage = 'url(https://www.zigya.com/blog/wp-content/uploads/rain_cloudy_sky_landscapes_hd-wallpaper-403777.jpg)';
            break;
            case 'sunny':
            body.style.backgroundImage = 'url(https://img.freepik.com/free-photo/blue-sky-background-with-clouds_1017-21758.jpg)';
            break;
        default:
            body.style.backgroundImage = 'url(https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1015-115-kstopjo8.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=07dea164582165ce549b3a07be4f71d5)';
            break;
    }
    body.style.backgroundSize = 'cover';
}
