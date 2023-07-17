<template>
  <div class="weather-app">
    <h1>Weather App Vue</h1>
    <div class="weather-search">
      <div class="weather-search">
        <form
                class="weather-search__form"
                @submit.prevent
        >
          <input
                  class="weather-search__input"
                  type="text"
                  v-model="cityName"
          />
          <button class="weather-search__button" @click=onSubmit>
            <svg class="weather-search__svg" fill="#000000" viewBox="0 0 50 50" width="24px" height="24px">
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
    <div class="weather-cities">
      <WeatherCard
              v-model="cities"
              v-for="city in cities"
              :city="city"
              :key="city.id"
              @removeCard="removeCard"
      />
    </div>
  </div>
</template>

<script>
  import WeatherCard from "./components/WeatherCard";
  import api from "./api/api";

  export default {
  name: 'App',
  components: {
    WeatherCard
  },
  data() {
    return {
      cityName: '',
      cities: []
    }
  },
  async created() {
    if (localStorage.cities) {
      this.cities = JSON.parse(localStorage.getItem('cities'));
      await this.cities.forEach(city => this.getWeather(city.name));
    }
  },
  watch: {
    cities(newCities) {
      this.cities = newCities;
    }
  },
  methods: {
    async onSubmit () {
      const cityData = await this.getWeather(this.cityName);
      this.cityName = '';
      if (!cityData) return;

      this.cities.forEach((city) => {
        if(city.id === cityData.id) {
          alert('test');

          return false;
        }
      });

      this.cities.push(cityData);

      localStorage.setItem('cities', JSON.stringify(this.cities));
    },
    async getWeather(city) {
      const response = await api.getCity(city);

      if (!response) return;

      const weatherData = {};

      weatherData.name = response.name;
      weatherData.id = response.id;
      weatherData.country = response.sys.country;
      weatherData.description = response.weather[0].main;
      weatherData.icon = response.weather[0].icon;
      weatherData.time = response.dt;
      weatherData.temp = Math.round(response.main.temp);
      weatherData.feelsLike = Math.round(response.main.feels_like);
      weatherData.humidity = Math.round(response.main.humidity);
      weatherData.clouds = Math.round(response.clouds.all);

      return weatherData;
    },
    removeCard(card) {
      this.cities = this.cities.filter(city => card.id !== city.id);
      localStorage.setItem('cities', JSON.stringify(this.cities));
    }
  }
}
</script>

<style lang="scss">
  #app {
    display: flex;
    justify-content: center;
  }

  .weather-app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .weather-search {
    display: flex;
    margin-bottom: 12px;

    &__form {
      display: flex;
      align-items: center;
      border: 2px solid teal;
      border-radius: 50px;
      padding: 10px 15px;
      width: fit-content;
    }

    &__input {
      width: 250px;
      height: 24px;
      padding: 0;
      font-size: 20px;
      outline: none;
      border: none;
    }

    &__button {
      display: flex;
      align-self: center;
      height: 100%;
      outline: none;
      border: none;
      cursor: pointer;
      background: none;
      background-size: 32px;
    }
  }

  .weather-cities {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
</style>
