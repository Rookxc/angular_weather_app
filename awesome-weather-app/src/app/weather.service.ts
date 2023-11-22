import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getCurrentWeather(): Observable<any> {
    // Example: Zurich coordinates
    const lat = 47.3769;
    const lon = 8.5417;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    // const url = `${this.apiUrl}?latitude=${lat}&longitude=${lon}&daily=5&hourly=24&current_weather=true&timezone=Europe%2FZurich&hourly_temperature_2m=true&current_weather_code=true&current_weather_icons=true&units=metric&language=en&daily_precipitation=true`;

    return this.http.get(url);
  }
}
