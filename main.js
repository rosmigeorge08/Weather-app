let weather = {
    "apiKey1": "33ccc4e56abfa8a49fb4eec09433941b",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey1
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { dt } = data;
        const { sunrise, sunset } = data.sys;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";

        function timeConverter(dt){
            var a = new Date(dt * 1000);
            var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
            var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var day = days[a.getDay()];
            var date = a.getDate();
            var datestamp = day + ', ' + date + ' ' + month + ' ' + year;
            return datestamp;
        }

        function riseConverter(sunrise){
            var b = new Date(sunrise * 1000);
            var rise_hour = b.getHours();
            var rise_min = b.getMinutes();
            var rise_sec = b.getSeconds();
            var rise_time = rise_hour + ':' + rise_min + ':' + rise_sec;
            return rise_time;
        }

        function setConverter(sunset){
            var c = new Date(sunset * 1000);
            var set_hour = c.getHours();
            var set_min = c.getMinutes();
            var set_sec = c.getSeconds();
            var set_time = set_hour + ':' + set_min + ':' + set_sec;
            return set_time;
        }
        document.querySelector(".date").innerText = timeConverter(dt);
        document.querySelector(".sunrise").innerText = ": " + riseConverter(sunrise);
        document.querySelector(".sunset").innerText = ": " + setConverter(sunset);
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')"
    },

    

    "apiKey2": "cb3407b917914b8c9c7631dfef637574",
    fetchAQI: function(city) {
        fetch(
            "https://api.weatherbit.io/v2.0/current/airquality?city=" 
            + city 
            + "&key=" 
            + this.apiKey2
        )
            .then((response) => response.json())
            .then((data) => this.displayAQI(data));
    },
    displayAQI: function(data){
        const { aqi } = data.data[0];
        document.querySelector(".aqi").innerText = "AQI: " + aqi;

        let airStat = "", color = "", health = "", caution = ""

        if (aqi > 300 ) {
            airStat = "Hazardous"
            color = "rgb(119, 0, 0)"
            health = "Health alert: everyone may experience more serious health effects."
            caution = "Everyone should avoid all outdoor exertion."
        } 
        else if (aqi > 201) {
            airStat = "Very Unhealthy"
			color = "rgb(204, 13, 13)"
            health = "Health warnings of emergency conditions. The entire population is more likely to be affected."
            caution = "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion."
        }
        else if (aqi > 151) {
            airStat = "Unhealthy"
			color = "rgb(204, 83, 13)"
            health = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects."
            caution = "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion."
        }
        else if(aqi > 101) {
            airStat = "Unhealthy for Sensitive Groups"
			color = "rgb(201, 204, 13)"
            health = "Members of sensitive groups may experience health effects. The general public is not likely to be affected."
            caution = "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
        }
        else if(aqi > 51) {
            airStat = "Moderate"
			color = "rgb(15, 134, 25)"
            health = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
            caution = "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion."
        }
        else {
            airStat = "Good"
			color = "rgb(68, 238, 77)"
            health = "Air quality is considered satisfactory, and air pollution poses little or no risk."
            caution = "None"
        }

        document.querySelector(".air-quality-status").innerText = airStat;
        document.querySelector(".air-quality-status").style.color = color;
        document.querySelector(".health").innerText = "Health Implications: " + health;
        document.querySelector(".caution").innerText = "Cautionary Statement: " + caution;
    },

    "apiKey3": "43f42dc14187441b8a10b99a09743d1a",
    fetchNews: function() {
        fetch(
            "https://newsapi.org/v2/top-headlines?country=in&publishedAt=today&apiKey="  
            + this.apiKey3
        )
            .then((response) => response.json())
            .then((data) => this.displayNews(data));
    },
    displayNews: function(data){
        const newsList = document.querySelector('.news-list');
        newsList.innerHTML = ''
        data.articles.forEach(article => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('href', article.url);
            a.setAttribute('target', '_blank');
            a.textContent = article.title;
            li.appendChild(a);
            newsList.appendChild(li);
        }); 
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
        this.fetchAQI(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key  == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Mumbai");
weather.fetchAQI("Mumbai");
weather.fetchNews();