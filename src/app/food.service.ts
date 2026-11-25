import { Injectable, computed, signal } from '@angular/core';
import { FoodItem } from './food.model';

const STORAGE_KEY = 'prato-certo-alimentos-v1';

@Injectable({ providedIn: 'root' })
export class FoodService {
  private readonly itemsState = signal<FoodItem[]>(this.load());
  readonly items = this.itemsState.asReadonly();
  readonly pending = computed(() => this.items().filter(item => !item.done));
  readonly completed = computed(() => this.items().filter(item => item.done));
  readonly savedKg = computed(() => this.completed().reduce((total, item) => total + item.amountKg, 0));
  readonly totalKg = computed(() => this.items().reduce((total, item) => total + item.amountKg, 0));

  add(data: Pick<FoodItem, 'name' | 'amountKg' | 'expiresOn' | 'destination'>): void {
    const item: FoodItem = {
      ...data, name: data.name.trim(), id: crypto.randomUUID(), done: false,
      createdAt: new Date().toISOString()
    };
    this.update([item, ...this.items()]);
  }

  toggle(id: string): void {
    this.update(this.items().map(item => item.id === id ? { ...item, done: !item.done } : item));
  }

  remove(id: string): void {
    this.update(this.items().filter(item => item.id !== id));
  }

  private update(next: FoodItem[]): void {
    // Quando a gente adiciona, conclui ou apaga um alimento, a lista nova chega aqui.
    // Primeiro a tela muda. Depois a gente guarda essa lista no navegador.
    this.itemsState.set(next);
    // Como o localStorage só guarda texto, transformamos a lista em JSON para salvar.
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
    catch { /* Se o navegador não deixar salvar, a lista ainda funciona enquanto a aba estiver aberta. */ }
  }

  private load(): FoodItem[] {
    // Quando o app abre, a gente procura os alimentos que ficaram salvos no navegador.
    // O texto vira lista de novo. Se algum alimento vier incompleto, a gente pula só ele.
    // Se não tiver nada salvo ou o JSON der erro, começamos com a lista vazia.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item): item is FoodItem =>
        !!item && typeof item === 'object' && typeof item.id === 'string' &&
        typeof item.name === 'string' && typeof item.amountKg === 'number' &&
        Number.isFinite(item.amountKg) && item.amountKg > 0 &&
        typeof item.expiresOn === 'string' &&
        (item.destination === 'consumir' || item.destination === 'doar') &&
        typeof item.done === 'boolean' && typeof item.createdAt === 'string'
      );
    } catch { return []; }
  }
}
