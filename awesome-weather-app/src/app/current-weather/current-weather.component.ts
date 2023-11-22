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
}
