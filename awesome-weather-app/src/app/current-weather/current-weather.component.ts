import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  currentWeatherData: any;
  private intervalId: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchCurrentWeather();
    this.startInterval();
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.fetchCurrentWeather();
    }, 5000);
  }

  stopInterval(): void {
    clearInterval(this.intervalId);
  }

  fetchCurrentWeather() {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      this.currentWeatherData = data;
    });
  }
}
