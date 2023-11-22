import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { fetchWeatherApi } from 'openmeteo';
import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  getCurrentWeather(): Observable<any> {
    const params = {
      //TODO Option to change
      latitude: 46.55,
      longitude: 15.64,
      current: ['temperature_2m', 'wind_speed_10m', 'weather_code'],
    };

    return new Observable((observer) => {
      fetchWeatherApi(this.apiUrl, params)
        .then((responses) => {
          const response = responses[0];

          const utcOffsetSeconds = response.utcOffsetSeconds();
          const currentTime = moment().utcOffset(utcOffsetSeconds);
          console.log('CR:', currentTime);
          const current = response.current()!;

          const weatherData = {
            date: new Date(
              (Number(current.time()) + response.utcOffsetSeconds()) * 1000
            ).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
            }),
            temperature: Math.round(current.variables(0)!.value()),
            windSpeed: current.variables(1)!.value().toFixed(1),
            weather_code: current.variables(2)!.value(),
          };

          observer.next(weatherData);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          observer.error(error);
        });
    });
  }

  getFiveDayForecast(): Observable<any> {
    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const params = {
      //TODO Option to change
      latitude: 46.55,
      longitude: 15.64,
      forecast_days: 5,
      hourly: 'temperature_2m',
    };

    return new Observable((observer) => {
      fetchWeatherApi(this.apiUrl, params)
        .then((responses) => {
          const response = responses[0];
          const utcOffsetSeconds = response.utcOffsetSeconds();
          const hourly = response.hourly()!;
          const weatherData = {
            time: range(
              Number(hourly.time()),
              Number(hourly.timeEnd()),
              hourly.interval()
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            temperature2m: hourly.variables(0)!.valuesArray()!,
          };
          observer.next(weatherData);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching hourly forecast:', error);
          observer.error(error);
        });
    });
  }
}
