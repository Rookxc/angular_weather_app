import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//Components
import { CurrentWeatherComponent } from './current-weather/current-weather.component';

//Services
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [AppComponent, CurrentWeatherComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
