import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FoodCardComponent } from './food-card.component';
import { FoodService } from './food.service';
import { daysUntil } from './food.model';

@Component({
  selector: 'app-home', standalone: true, imports: [FormsModule, FoodCardComponent],
  template: `
    <section class="hero"><div class="shell hero-grid">
      <div><div class="eyebrow"><span class="eyebrow-dot"></span> SUA ROTINA MAIS CONSCIENTE</div>
        <h1>Comida boa merece <em>um destino melhor.</em></h1>
        <p>Organize o que já tem em casa, veja o que está perto de vencer e transforme pequenas atitudes em menos desperdício.</p>
        <a class="hero-link" href="#adicionar">Começar minha lista <span aria-hidden="true">↗</span></a>
      </div>
      <div class="hero-art" aria-hidden="true"><div class="art-halo"></div><div class="art-plate"><span>🥬</span><span>🍅</span><span>🥕</span></div><div class="art-sticker">alimento<br>é cuidado <b>✳</b></div><div class="art-note">um passo de cada vez <span>↗</span></div></div>
    </div></section>

    <section class="shell dashboard" aria-label="Resumo da despensa">
      <div class="section-heading"><div><span class="kicker">SEU IMPACTO, NO SEU TEMPO</span><h2>Um olhar para sua despensa</h2></div><span class="subtle">Seu progresso fica salvo neste navegador</span></div>
      <div class="stats-grid">
        <div class="stat-card"><span class="stat-icon green">✳</span><span>Alimentos na lista</span><strong>{{ food.items().length }}</strong><small>itens registrados</small></div>
        <div class="stat-card"><span class="stat-icon yellow">◷</span><span>Perto do vencimento</span><strong>{{ urgentCount() }}</strong><small>até 2 dias ou vencidos</small></div>
        <div class="stat-card highlight"><span class="stat-icon pale">↗</span><span>Alimentos aproveitados</span><strong>{{ food.savedKg().toLocaleString('pt-BR', { maximumFractionDigits: 2 }) }} <i>kg</i></strong><small>marcados como concluídos</small></div>
      </div>
      <div class="goal-strip"><span class="goal-illustration" aria-hidden="true">◎</span><div><strong>Meta de aproveitamento</strong><span>Que tal aproveitar 5 kg de alimentos? Cada item concluído conta.</span></div><div class="goal-progress"><div class="goal-track" role="progressbar" [attr.aria-valuenow]="progress()" aria-valuemin="0" aria-valuemax="100" aria-label="Meta de aproveitamento"><span [style.width.%]="progress()"></span></div><b>{{ progress() }}%</b></div></div>
    </section>

    <section class="shell workspace">
      <div class="list-panel"><div class="panel-heading"><div><span class="kicker">O QUE TEM POR AÍ?</span><h2>Minha lista de alimentos</h2></div><span class="count-badge">{{ food.pending().length }} pendentes</span></div>
        @if (food.pending().length) {
          <div class="food-list">
            @for (item of food.pending(); track item.id) {
              <app-food-card [item]="item" (toggle)="food.toggle($event)" (remove)="food.remove($event)" />
            }
          </div>
        } @else { <div class="empty-state"><span>✳</span><h3>Sua lista está pronta para começar</h3><p>Adicione um alimento no formulário ao lado e acompanhe o prazo para aproveitá-lo.</p></div> }
        @if (food.completed().length) {
          <div class="completed-heading"><strong>Já aproveitados</strong><span>{{ food.completed().length }} concluídos</span></div>
          <div class="food-list">
            @for (item of food.completed(); track item.id) {
              <app-food-card [item]="item" (toggle)="food.toggle($event)" (remove)="food.remove($event)" />
            }
          </div>
        }
      </div>
      <aside class="form-panel" id="adicionar"><div class="form-decor">✳</div><span class="kicker">CUIDAR COMEÇA AQUI</span><h2>Adicionar alimento</h2><p>Um registro rápido para lembrar de consumir ou compartilhar antes que estrague.</p>
        <form (ngSubmit)="add()" #foodForm="ngForm">
          <label for="name">Qual alimento?</label><input id="name" name="name" type="text" maxlength="60" required placeholder="Ex.: bananas, arroz, tomate..." [(ngModel)]="name" />
          <div class="form-row"><div><label for="amount">Quantidade (kg)</label><input id="amount" name="amount" type="number" min="0.01" max="10000" step="0.01" required placeholder="Ex.: 0,5" [(ngModel)]="amountKg" /></div><div><label for="expiry">Data de validade</label><input id="expiry" name="expiry" type="date" required [(ngModel)]="expiresOn" /></div></div>
          <label for="destination">O que pretende fazer?</label><select id="destination" name="destination" [(ngModel)]="destination"><option value="consumir">Consumir em casa</option><option value="doar">Separar para doação</option></select>
          <button class="submit-button" type="submit" [disabled]="foodForm.invalid">Adicionar à lista <span aria-hidden="true">↗</span></button>
          @if (message) { <p class="form-message" role="status">{{ message }}</p> }
        </form><div class="form-foot">✦ &nbsp; Pequenas escolhas, grandes mudanças.</div>
      </aside>
    </section>
    <section class="shell info-line"><span>✳</span><p><strong>Uma observação honesta:</strong> o total aproveitado é a soma dos itens que você marcou como concluídos. É um registro pessoal, não uma medição científica do desperdício evitado.</p></section>
  `
})
export class HomeComponent {
  readonly food = inject(FoodService);
  name = '';
  amountKg: number | null = null;
  expiresOn = '';
  destination: 'consumir' | 'doar' = 'consumir';
  message = '';
  readonly urgentCount = computed(() => this.food.pending().filter(item => daysUntil(item.expiresOn) <= 2).length);
  readonly progress = computed(() => Math.min(100, Math.round(this.food.savedKg() / 5 * 100)));

  add(): void {
    const amount = Number(this.amountKg);
    if (!this.name.trim() || !this.expiresOn || !Number.isFinite(amount) || amount <= 0 || amount > 10000) return;
    this.food.add({ name: this.name, amountKg: amount, expiresOn: this.expiresOn, destination: this.destination });
    this.name = ''; this.amountKg = null; this.expiresOn = ''; this.destination = 'consumir';
    this.message = 'Alimento adicionado! Você já deu o primeiro passo.';
  }
}
