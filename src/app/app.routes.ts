import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { GuideComponent } from './guide.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Minha despensa | Prato Certo' },
  { path: 'guia', component: GuideComponent, title: 'Guia prático | Prato Certo' },
  { path: '**', redirectTo: '' }
];
