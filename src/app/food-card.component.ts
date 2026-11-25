import { Component, input, output } from '@angular/core';
import { FoodItem, daysUntil } from './food.model';

@Component({
  selector: 'app-food-card',
  standalone: true,
  template: `
    <article class="food-card" [class.is-done]="item().done">
      <button type="button" class="check" [class.checked]="item().done" (click)="toggle.emit(item().id)" [attr.aria-label]="item().done ? 'Voltar ' + item().name + ' para pendentes' : 'Concluir ' + item().name" [attr.aria-pressed]="item().done">
        @if (item().done) { ✓ }
      </button>
      <div class="food-info">
        <strong>{{ item().name }}</strong>
        <span>{{ item().amountKg.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) }} kg · {{ item().destination === 'doar' ? 'Separar para doação' : 'Consumir em casa' }}</span>
      </div>
      <span class="date-pill" [class.urgent]="!item().done && days <= 2" [class.done]="item().done">
        {{ item().done ? 'Aproveitado' : days < 0 ? 'Venceu há ' + (-days) + ' dia(s)' : days === 0 ? 'Vence hoje' : days === 1 ? 'Vence amanhã' : 'Faltam ' + days + ' dias' }}
      </span>
      <button type="button" class="remove" (click)="remove.emit(item().id)" [attr.aria-label]="'Remover ' + item().name" title="Remover item">×</button>
    </article>
  `
})
export class FoodCardComponent {
  // Este cartão recebe um alimento da tela principal. Quando clicam nos botões,
  // ele manda o ID de volta para a tela concluir ou apagar o alimento.
  readonly item = input.required<FoodItem>();
  readonly toggle = output<string>();
  readonly remove = output<string>();
  get days(): number { return daysUntil(this.item().expiresOn); }
}
