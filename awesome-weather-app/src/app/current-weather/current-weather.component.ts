import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent implements OnInit {
  currentWeatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchCurrentWeather();
  }

  fetchCurrentWeather() {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      this.currentWeatherData = data;
    });
  }

  getBackgroundColor(weatherCode: number): string {
    // Implement your logic to map weather codes to background colors
    switch (weatherCode) {
      case 0:
        return 'blue'; // Example color for clear sky
      case 1:
        return 'blue'; // Example color for clear sky
      case 2:
        return 'gray'; // Example color for clear sky
      case 3:
        return 'gray'; // Example color for mainly clear, partly cloudy, and overcast
      // Add more cases for other weather codes
      default:
        return 'white'; // Default color
    }
  }
}
