import { BaseView } from './BaseView.js';
import { CardapioModel, TIPO_LABELS } from '../../models/CardapioModel.js';
import { RankingModel } from '../../models/RankingModel.js';
import { TicketModel } from '../../models/TicketModel.js';
import { FinanceiroModel } from '../../models/FinanceiroModel.js';
import { ChartService } from '../../assets/js/services/ChartService.js';

/** View — telas do perfil Aluno */
export class AlunoView extends BaseView {
  static renderDashboard(user) {
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    this.setText('aluno-greating', user.nome.toUpperCase());
    this.setText('aluno-date', hoje);
    this.setHTML('refeicao-atual-pill', '<span class="chip chip-green">🍽️ Almoço · 11h30</span>');

    this.setHTML('kpi-aluno', [
      this.kpiCard('🍽️', 'Refeições este mês', '32', '+4 vs mês anterior'),
      this.kpiCard('🌱', 'Desperdício evitado', '1.2 kg', 'Turma RDC 2024', 'blue'),
      this.kpiCard('🏆', 'Posição no ranking', '2º', 'Índice RI: 2.1%', 'gold'),
      this.kpiCard('📅', 'Reservas ativas', '2', 'Próxima: amanhã', 'red'),
    ].join(''));

    const refeicao = CardapioModel.getAll().find(c => c.tipo === 'almoco');
    this.setHTML('refeicao-hoje-detalhe', `
      <div class="refeicao-detalhe">
        <div class="rd-nome">${refeicao?.nome || '—'}</div>
        <div class="rd-macros">
          <span>🔥 ${refeicao?.cal || 0} kcal</span>
          <span>🍞 ${refeicao?.carb || 0}g carb</span>
          <span>🥩 ${refeicao?.prot || 0}g prot</span>
        </div>
      </div>`);

    const ranking = RankingModel.getAll();
    const minhaTurma = RankingModel.findByTurma(user.turma) || ranking[1];
    this.setHTML('mini-ranking', `
      <div class="mini-rank">
        <div class="mr-pos">${minhaTurma.pos}º</div>
        <div class="mr-info">
          <strong>${minhaTurma.turma}</strong>
          <span>RI: ${minhaTurma.ri}% · ${minhaTurma.kg} kg/semana</span>
        </div>
      </div>`);

    this.setHTML('meta-mes-widget', `
      <div class="meta-widget">
        <div class="meta-pct">72%</div>
        <p>Meta de redução de desperdício</p>
        <div class="meta-bar"><div class="meta-fill" style="width:72%"></div></div>
      </div>`);

    ChartService.drawBar('chart-aluno-desp', ['S1','S2','S3','S4','S5','S6'], [14, 12, 11, 10, 9.5, 9.2]);
  }

  static renderReservas() {
    const cards = CardapioModel.getAll().map(c => `
      <div class="reserva-card">
        <div class="rc-tipo">${TIPO_LABELS[c.tipo] || c.tipo}</div>
        <div class="rc-nome">${c.nome}</div>
        <div class="rc-cal">${c.cal} kcal</div>
        <button class="btn-primary btn-sm" onclick="reservarRefeicao(${c.id})">Reservar</button>
      </div>`).join('');
    this.setHTML('reserva-refeicoes-container', cards);

    const meusTickets = TicketModel.filterByAluno('Antonio');
    this.setHTML('tickets-aluno-container', meusTickets.map(t => `
      <div class="ticket-card" onclick="abrirTicket('${t.codigo}')">
        <div class="tc-codigo">${t.codigo}</div>
        <div class="tc-refeicao">${t.refeicao}</div>
        <span class="chip chip-${t.status === 'confirmado' ? 'green' : 'blue'}">${t.status}</span>
      </div>`).join(''));
  }

  static renderNutricao() {
    this.setHTML('kpi-nutri-aluno', [
      this.kpiCard('🔥', 'Média calórica', '462 kcal', 'por refeição'),
      this.kpiCard('🍞', 'Carboidratos', '52g', 'média diária', 'blue'),
      this.kpiCard('🥩', 'Proteínas', '28g', 'média diária', 'gold'),
    ].join(''));

    const tbody = CardapioModel.getAll().map(c => {
      const total = c.carb + c.prot + c.lip || 1;
      return `<tr>
        <td>${c.nome}</td><td>${TIPO_LABELS[c.tipo]}</td><td>${c.cal}</td>
        <td>${c.carb}</td><td>${c.prot}</td><td>${c.lip}</td>
        <td>${Math.round(c.carb / total * 100)}%</td>
        <td>${Math.round(c.prot / total * 100)}%</td>
        <td>${Math.round(c.lip / total * 100)}%</td>
      </tr>`;
    }).join('');
    this.setHTML('nutri-tbody', tbody);

    ChartService.drawDonut('chart-macros-donut', [
      { value: 55, color: '#f59e0b' },
      { value: 25, color: '#16a34a' },
      { value: 20, color: '#0284c7' },
    ]);
    ChartService.drawBar('chart-cal-tipo', ['Café', 'Almoço', 'Tarde', 'Jantar'], [320, 580, 240, 280], '#0284c7');
  }

  static renderRanking() {
    const podium = RankingModel.getAll().slice(0, 3);
    this.setHTML('ranking-podium', podium.map((r, i) => `
      <div class="podium-item pos-${i + 1}">
        <div class="podium-medal">${['🥇','🥈','🥉'][i]}</div>
        <div class="podium-turma">${r.turma}</div>
        <div class="podium-ri">${r.ri}% RI</div>
      </div>`).join(''));

    this.setHTML('ranking-full', RankingModel.getAll().map(r => `
      <div class="rank-row">
        <span class="rank-pos">${r.pos}º</span>
        <span class="rank-turma">${r.turma}</span>
        <span class="rank-ri">${r.ri}%</span>
        <span class="rank-kg">${r.kg} kg</span>
      </div>`).join(''));

    ChartService.drawLine('chart-rank-evolucao', ['S1','S2','S3','S4'], [3.2, 2.8, 2.4, 2.1]);
  }

  static renderDesperdicio() {
    this.setHTML('kpi-desp-aluno', [
      this.kpiCard('⚖️', 'Desperdício semanal', '9.5 kg', 'Campus Boa Viagem'),
      this.kpiCard('📉', 'Redução', '-12%', 'vs semana anterior', 'green'),
      this.kpiCard('🌱', 'CO₂ evitado', '18 kg', 'estimativa', 'blue'),
    ].join(''));
    this.setHTML('impacto-social', '<div class="impacto-card"><p>🍽️ O desperdício evitado poderia alimentar <strong>38 famílias</strong> por uma semana.</p></div>');
    ChartService.drawLine('chart-desp-aluno', ['Jan','Fev','Mar','Abr','Mai'], [14, 13, 12, 11, 9.5]);
    ChartService.drawBar('chart-aceitacao', ['Ótima','Boa','Regular','Ruim'], [62, 25, 10, 3], '#16a34a');
  }

  static renderFinanceiro() {
    this.setHTML('kpi-fin-aluno', [
      this.kpiCard('💰', 'Perda semanal', 'R$ 1.240', 'estimativa campus'),
      this.kpiCard('👤', 'Custo/aluno', 'R$ 14,50', 'média', 'blue'),
      this.kpiCard('📊', '% perdido', '6.7%', 'do orçamento', 'gold'),
    ].join(''));
    ChartService.drawBar('chart-fin-aluno', ['S17','S18','S19','S20','S21'], [1420, 1380, 1350, 1380, 1240], '#dc2626');
    this.setHTML('fin-tbody-aluno', FinanceiroModel.getAll().map(f => `
      <tr><td>${f.periodo}</td><td>R$ ${f.total.toLocaleString('pt-BR')}</td>
      <td>R$ ${f.perdido.toLocaleString('pt-BR')}</td><td>R$ ${f.custoAluno}</td>
      <td>${((f.perdido / f.total) * 100).toFixed(1)}%</td></tr>`).join(''));
  }

  static renderPerfil(user) {
    this.$('perfil-avatar')?.setAttribute('src', user.avatar);
    this.setText('perfil-nome', user.nome);
    this.setText('perfil-matricula', user.matricula);
    this.setText('perfil-curso', user.curso);
    this.setText('perfil-turma', user.turma);
    this.setText('info-nome-completo', user.nomeCompleto);
    this.setText('info-email', user.email);
  }
}
