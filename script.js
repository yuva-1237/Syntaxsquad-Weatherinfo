    let weather = {
      apikey: "37ce19ed4177e195d06d45a9abdd2f08", // Replace this with your actual API key

      fetchWeather: function (city) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apikey
        )
          .then((response) => response.json())
          .then((data) => this.displayWeather(data));
      },

      displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80" + name + "')";
      },

      search: function () {
        this.fetchWeather(document.querySelector(".searchbar").value);
      },
    };

    document.querySelector(".search button").addEventListener("click", function () {
      weather.search();
    });

    document.querySelector(".searchbar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });

    weather.fetchWeather("chennai");