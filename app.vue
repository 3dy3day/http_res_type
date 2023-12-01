<template>
  <div class="weather-report">
    <h1>Weather Report for Tokyo</h1>
    <div v-if="tokyoWeather" class="report">
      <p>Reported at: {{ tokyoWeather.reportDatetime }}</p>
      <h2>Weather in Tokyo</h2>
      <ul>
        <li v-for="(weather, index) in tokyoWeather.weathers" :key="index">
          {{ tokyoWeather.timeDefines[index] }}: {{ weather }}
        </li>
      </ul>
    </div>
    <div v-else>
      Loading or no weather data for Tokyo.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAPI } from './composables/requests';

const tokyoWeather = ref(null);

const fetchWeatherData = async () => {
  const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json';
  try {
    const response = await getAPI(url);
    processWeatherData(response.data);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
  }
};

const processWeatherData = (data) => {
  const tokyoAreaCode = '130010';
  const report = data.find(report =>
    report.timeSeries.some(series =>
      series.areas.some(area => area.area.code === tokyoAreaCode)
    )
  );

  if (report) {
    const series = report.timeSeries.find(series => 
      series.areas.some(area => area.area.code === tokyoAreaCode)
    );

    if (series) {
      const tokyoArea = series.areas.find(area => area.area.code === tokyoAreaCode);
      if (tokyoArea) {
        tokyoWeather.value = {
          reportDatetime: report.reportDatetime,
          timeDefines: series.timeDefines,
          weathers: tokyoArea.weathers
        };
      }
    }
  }
};

onMounted(fetchWeatherData);
</script>

