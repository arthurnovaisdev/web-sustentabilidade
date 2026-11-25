import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guide', standalone: true, imports: [RouterLink],
  template: `
    <section class="guide-hero"><div class="shell"><span class="kicker">GUIA PRÁTICO · ODS 12</span><h1>Antes de jogar fora, <em>vale pensar de novo.</em></h1><p>Evitar o desperdício não exige uma rotina perfeita. Começa com atenção ao que já temos e um pouco de planejamento.</p><a routerLink="/" class="hero-link">Voltar à minha despensa <span aria-hidden="true">↗</span></a></div></section>
    <section class="shell guide-content"><div class="section-heading"><div><span class="kicker">PASSOS POSSÍVEIS NO DIA A DIA</span><h2>Como aproveitar melhor?</h2></div></div>
      <div class="tips-grid">
        <article class="tip"><span class="tip-number">01 / ORGANIZE</span><span class="tip-icon">◷</span><h3>Veja o que vence primeiro</h3><p>Deixe os alimentos com data mais próxima à frente. Na lista, os avisos de prazo ajudam a escolher o que preparar hoje.</p></article>
        <article class="tip"><span class="tip-number">02 / APROVEITE</span><span class="tip-icon">✳</span><h3>Planeje uma refeição</h3><p>Antes de comprar mais, pense numa receita com o que já está em casa. Mesmo uma pequena porção aproveitada faz diferença.</p></article>
        <article class="tip"><span class="tip-number">03 / COMPARTILHE</span><span class="tip-icon">↗</span><h3>Doe quando puder</h3><p>Se estiver em boas condições e você não for consumir, procure alguém ou uma iniciativa local que possa receber o alimento.</p></article>
      </div>
      <div class="guide-note"><div><span class="kicker">POR QUE ISSO IMPORTA?</span><h2>Consumo responsável se constrói na prática.</h2><p>O Objetivo de Desenvolvimento Sustentável 12 incentiva formas mais responsáveis de produzir e consumir. Aqui, ele aparece numa atitude cotidiana: prestar atenção à validade, organizar a despensa e evitar perdas.</p></div><span class="note-symbol" aria-hidden="true">12<span>ODS</span></span></div>
      <div class="howto"><span class="kicker">COMO USAR O PRATO CERTO</span><h2>Seu ritmo, seus registros.</h2><div class="howto-grid"><p><b>1.</b> Cadastre o alimento, a quantidade e a validade.</p><p><b>2.</b> Confira os avisos e escolha consumir ou doar.</p><p><b>3.</b> Marque como concluído para acompanhar sua meta.</p></div><p class="subtle">Os dados ficam apenas neste navegador, neste dispositivo. Limpar os dados do navegador pode apagá-los.</p></div>
    </section>
  `
})
export class GuideComponent {}
