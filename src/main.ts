import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, { providers: [provideRouter(routes)] })
  .catch(error => console.error('Não foi possível iniciar o Prato Certo:', error));
