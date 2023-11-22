import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
})
export class ForecastComponent implements OnInit {
  weatherForecast: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetch5DayForecast();
  }

  fetch5DayForecast() {
    this.weatherService.getFiveDayForecast().subscribe((data) => {
      this.weatherForecast = data;
    });
  }
}
