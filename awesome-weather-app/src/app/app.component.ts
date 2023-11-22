import { Component } from '@angular/core';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CurrentWeatherComponent,
    ForecastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'awesome-weather-app';
  constructor(private weatherService: WeatherService) {}

  isDaytime(): boolean {
    let currentHour = new Date().getHours();
    this.weatherService.getCurrentWeather().subscribe((data) => {
      currentHour = data.date;
    });
    console.log('CURRENT HOUR: ', currentHour);
    return currentHour >= 6 && currentHour < 18;
  }
}
