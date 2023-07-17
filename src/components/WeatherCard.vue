<template>
  <div
          :class="['weather-card', {
            'weather-card_night-clouds': city.description === 'Clouds' && city.icon.includes('n'),
            'weather-card_day-clouds': city.description === 'Clouds' && city.icon.includes('d'),
            'weather-card_night-clear': city.description === 'Clear' && city.icon.includes('n'),
            'weather-card_day-clear': city.description === 'Clear' && city.icon.includes('d'),
            'weather-card_night-mist': city.description === 'Mist' && city.icon.includes('n'),
            'weather-card_day-mist': city.description === 'Mist' && city.icon.includes('d')
          }]">
    <div class="weather-card__content">
      <div class="weather-card__header">
        <div class="weather-card__title">
          <flag :iso="city.country" />
          {{ city.name }}
        </div>
        <div class="weather-card__remove" @click="removeCard">
          X
        </div>
      </div>
      <div class="weather-card__image">
        <img class="weather-card__image-content" :src="`http://openweathermap.org/img/wn/${city.icon}@4x.png`" alt="">
        {{ city.description }}
      </div>
      <div>
        Temperature: {{ temperature(city.temp) }}
      </div>
      <div>
        Last Update: {{ time }}
      </div>
      <div>
        Feels Like: {{ temperature(city.feelsLike) }}
      </div>
      <div>
        Humidity: {{ city.humidity }}%
      </div>
      <div>
        Clouds: {{ city.clouds }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WeatherCard',
    props: {
      city: {
        type: Object,
        required: true
      },
    },
    computed: {
      time() {
        return new Date(this.city.time * 1000).toLocaleTimeString();
      }
    },
    methods: {
      temperature(temp) {
        return Math.sign(temp) > 0 ? `+${temp}` : temp;
      },
      removeCard() {
        this.$emit('removeCard', this.city);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .weather-card {
    margin: 0 auto;
    text-align: center;
    width: 90%;
    border-radius: 8px;

    &__content {
      padding: 12px;
      background-color: rgba(0, 0, 0, 0.3);
    }

    &__header {
      display: flex;
      justify-content: center;
    }

    &__remove {
      padding: 4px;
      background-color: #fff;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      margin-left: auto;
    }

    &_night-clouds {
      background-image: url('https://stihi.ru/pics/2016/12/15/9472.jpg');
      background-size: cover;
    }

    &_day-clouds {
      background-image: url('https://runews24.ru/assets/images/uploads/2019/8/8/1-0.1A2C4543-FA70-4E27-A556-F1244AF58C48.jpeg');
      background-size: cover;
    }

    &_day-clear {
      background-image: url('https://digiro.ir/wp-content/uploads/2018/12/bigstock-Blue-sky-24967379-1-e1544282667997.jpg');
      background-size: cover;
    }

    &_night-clear {
      background-image: url('https://tailpic.com/wp-content/uploads/2020/03/beautiful-quotes-on-life-for-beauty-of-life.jpg');
      background-size: cover;
    }

    &_day-mist {
      background-image: url('https://photorator.com/photos/images/trees-in-the-mist-el-portal-california--84948.jpg');
      background-size: cover;
    }

    &_night-mist {
      background-image: url('https://photorator.com/photos/images/trees-in-the-mist-el-portal-california--84948.jpg');
      background-size: cover;
    }
  }
</style>
