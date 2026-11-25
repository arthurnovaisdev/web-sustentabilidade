import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="site-header">
      <div class="shell nav-inner">
        <a class="brand" routerLink="/" aria-label="Prato Certo, voltar ao início">
          <span class="brand-mark" aria-hidden="true">✳</span><span>prato<span class="brand-light">certo</span><small>menos desperdício, mais cuidado</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Minha despensa</a>
          <a routerLink="/guia" routerLinkActive="active">Guia prático</a>
        </nav>
      </div>
    </header>
    <main><router-outlet /></main>
    <footer class="site-footer"><div class="shell footer-inner"><span>✳ Prato Certo</span><span>Pequenas escolhas também fazem diferença.</span><span>Projeto acadêmico · ODS 12</span></div></footer>
  `
})
export class AppComponent {}
