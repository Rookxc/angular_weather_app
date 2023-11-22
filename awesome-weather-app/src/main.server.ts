import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

// import { bootstrapApplication } from '@angular/platform-server';
// import { AppModule } from './app/app.module';
// import { config } from './app/app.config.server';

// const bootstrap = () => bootstrapApplication(AppModule, config);

// export default bootstrap;
