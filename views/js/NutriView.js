import { BaseView } from './BaseView.js';
import { CardapioModel, TIPO_LABELS } from '../../models/CardapioModel.js';
import { TicketModel } from '../../models/TicketModel.js';
import { RankingModel } from '../../models/RankingModel.js';
import { DesperdicioModel } from '../../models/DesperdicioModel.js';
import { FinanceiroModel } from '../../models/FinanceiroModel.js';
import { CadastroModel } from '../../models/CadastroModel.js';
import { ChartService } from '../../assets/js/services/ChartService.js';
import { state } from '../../models/AppState.js';

/** View — telas do perfil Nutricionista */
export class NutriView extends BaseView {
  static renderDashboard() {
    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    this.setText('nutri-date', hoje);

    this.setHTML('kpi-nutri-admin', [
      this.kpiCard('⚖️', 'Desperdício hoje', '12.5 kg', 'Almoço'),
      this.kpiCard('👥', 'Alunos servidos', '320', 'hoje', 'blue'),
      this.kpiCard('✅', 'Aceitação média', '94.4%', 'esta semana', 'green'),
      this.kpiCard('💰', 'Perda financeira', 'R$ 187', 'hoje', 'gold'),
    ].join(''));

    this.setHTML('top-rejeicao', CardapioModel.getAll().slice(0, 3).map((c, i) => `
      <div class="top-rej-item"><span>${i + 1}.</span> ${c.nome} <strong>—</strong></div>`).join(''));

    this.setHTML('alertas-admin', `
      <div class="alerta-item alerta-warn">⚠️ Desperdício acima da meta na terça-feira</div>
      <div class="alerta-item alerta-info">ℹ️ 2 cadastros pendentes de aprovação</div>
      <div class="alerta-item alerta-ok">✅ Meta semanal de aceitação atingida</div>`);

    ChartService.drawBar('chart-nutri-mensal', ['Jan','Fev','Mar','Abr','Mai'], [48, 45, 42, 40, 38]);
    ChartService.drawDonut('chart-nutri-tipo', [
      { value: 40, color: '#16a34a' },
      { value: 30, color: '#f59e0b' },
      { value: 20, color: '#0284c7' },
      { value: 10, color: '#8b5cf6' },
    ]);
  }

  static renderCardapio(filtro = 'todos') {
    const lista = CardapioModel.filterByTipo(filtro);
    this.setHTML('admin-card-tbody', lista.map(c => `
      <tr>
        <td>${c.dia}</td>
        <td>${TIPO_LABELS[c.tipo] || c.tipo}</td>
        <td>${c.nome}</td>
        <td>${c.cal}</td><td>${c.carb}g</td><td>${c.prot}g</td><td>${c.lip}g</td>
        <td>
          <button class="btn-sm-outline" onclick="editarCardapio(${c.id})"><i class="fa fa-edit"></i></button>
          <button class="btn-sm-outline btn-danger" onclick="excluirCardapio(${c.id})"><i class="fa fa-trash"></i></button>
        </td>
      </tr>`).join(''));
  }

  static renderTickets(filtro = state.ticketFiltro) {
    const lista = TicketModel.filter(filtro);
    const statusLabel = { confirmado: 'Confirmado', utilizado: 'Utilizado', cancelado: 'Cancelado' };
    const statusColor = { confirmado: 'green', utilizado: 'blue', cancelado: 'red' };

    this.setHTML('tickets-nutri-list', lista.map(t => `
      <div class="ticket-nutri-card">
        <div class="tnc-left">
          <div class="tnc-codigo">${t.codigo}</div>
          <div class="tnc-info">
            <div class="tnc-name">${t.aluno}</div>
            <div class="tnc-meta">${t.turma}</div>
          </div>
        </div>
        <div class="tnc-center">
          <div class="tnc-name">${t.refeicao}</div>
          <div class="tnc-meta">${t.tipo} · ${t.data}</div>
          <div class="tnc-status">
            <span class="chip chip-outline">${t.turma}</span>
            <span class="chip chip-${statusColor[t.status] || 'outline'}">${statusLabel[t.status] || t.status}</span>
          </div>
        </div>
        <div class="tnc-right">
          <button class="btn-sm-outline" onclick="abrirTicket('${t.codigo}')">
            <i class="fa fa-eye"></i> Ver ticket
          </button>
        </div>
      </div>`).join('') || '<p class="empty-msg">Nenhum ticket encontrado.</p>');
  }

  static renderDesperdicio() {
    this.setHTML('desp-tbody', DesperdicioModel.getAll().map(d => `
      <tr>
        <td>${d.data}</td><td>${d.tipo}</td><td>${d.alunos}</td>
        <td>${d.distribuido} kg</td><td>${d.rejeito} kg</td>
        <td>${(100 - d.ri).toFixed(1)}%</td><td>${d.ri}%</td>
        <td>R$ ${d.valorPerdido}</td><td>${Math.round(d.rejeito / 0.35)}</td>
        <td><button class="btn-sm-outline"><i class="fa fa-trash"></i></button></td>
      </tr>`).join(''));
  }

  static renderFinanceiro() {
    this.setHTML('kpi-fin-nutri', [
      this.kpiCard('💰', 'Orçamento mensal', 'R$ 74.240', 'maio 2026'),
      this.kpiCard('📉', 'Total perdido', 'R$ 4.960', '-8% vs abril', 'red'),
      this.kpiCard('💡', 'Economia possível', 'R$ 1.650', 'com meta RI', 'green'),
    ].join(''));
    ChartService.drawBar('chart-fin-nutri', ['S17','S18','S19','S20','S21'], [18560, 18270, 17800, 18270, 18560], '#16a34a');
    ChartService.drawLine('chart-fin-pct', ['S17','S18','S19','S20','S21'], [7.2, 7.5, 6.8, 7.5, 6.7]);
    this.setHTML('fin-nutri-tbody', FinanceiroModel.getAll().map(f => `
      <tr><td>${f.periodo}</td><td>${f.refeicoes}</td>
      <td>R$ ${f.total.toLocaleString('pt-BR')}</td><td>R$ ${f.perdido.toLocaleString('pt-BR')}</td>
      <td>R$ ${f.custoAluno}</td><td>R$ ${f.economia}</td>
      <td>${((f.perdido / f.total) * 100).toFixed(1)}%</td></tr>`).join(''));
  }

  static renderAnalise() {
    ChartService.drawBar('chart-dia-semana', ['Seg','Ter','Qua','Qui','Sex'], [8, 12, 9, 7, 10]);
    ChartService.drawBar('chart-ref-aceit', ['Frango','Peixe','Sopa','Aveia'], [94, 91, 88, 96], '#0284c7');
    ChartService.drawLine('chart-tendencia', ['Jan','Fev','Mar','Abr','Mai'], [5.2, 4.8, 4.5, 4.2, 3.9]);
    ChartService.drawBar('chart-alimentos', ['Arroz','Feijão','Salada','Carne','Sobremesa'], [3, 5, 8, 12, 18], '#dc2626');
    this.setHTML('analise-tbody', CardapioModel.getAll().map(c => `
      <tr><td>${c.nome}</td><td>320</td><td>5.2%</td>
      <td><span class="chip chip-green">Boa</span></td>
      <td>R$ 45,00</td><td>Manter no cardápio</td></tr>`).join(''));
  }

  static renderCadastros(filtro = state.cadastroFiltro) {
    const lista = CadastroModel.filter(filtro);
    this.setHTML('kpi-cadastros', [
      this.kpiCard('⏳', 'Pendentes', CadastroModel.countByStatus('pendente'), 'aguardando revisão'),
      this.kpiCard('✅', 'Aprovados', CadastroModel.countByStatus('aprovado'), '', 'green'),
      this.kpiCard('❌', 'Recusados', CadastroModel.countByStatus('recusado'), '', 'red'),
    ].join(''));

    this.setHTML('cadastros-tbody', lista.map(c => `
      <tr>
        <td>${c.nome}</td><td>${c.email}</td><td>${c.curso}</td><td>${c.data}</td>
        <td><span class="chip chip-${c.status === 'pendente' ? 'gold' : c.status === 'aprovado' ? 'green' : 'red'}">${c.status}</span></td>
        <td>
          ${c.status === 'pendente' ? `<button class="btn-sm-outline" onclick="revisarCadastro(${c.id})"><i class="fa fa-eye"></i> Revisar</button>` : '—'}
        </td>
      </tr>`).join(''));
  }

  static renderRanking() {
    this.setHTML('ranking-editor', RankingModel.getAll().map(r => `
      <div class="rank-edit-row">
        <span class="re-pos">${r.pos}º</span>
        <span class="re-turma">${r.turma}</span>
        <span class="re-ri">${r.ri}%</span>
        <button class="btn-sm-outline" onclick="editarRanking('${r.turma}', ${r.pos}, ${r.ri})"><i class="fa fa-edit"></i></button>
      </div>`).join(''));
    ChartService.drawLine('chart-ranking-evolucao', ['S1','S2','S3','S4'], [12, 11, 10, 9.5]);
    this.setHTML('historico-ranking-tbody', `
      <tr><td>2026-05-20 14:30</td><td>RDC 2024</td><td>3º</td><td>2º</td><td>Jessica de Lima</td></tr>
      <tr><td>2026-05-13 09:15</td><td>EC 2024</td><td>2º</td><td>3º</td><td>Jessica de Lima</td></tr>`);
  }

  static renderPerfil(user) {
    this.$('perfil-avatar')?.setAttribute('src', user.avatar);
    this.setText('perfil-nome', user.nome);
    this.setText('perfil-matricula', user.matricula);
    this.setText('perfil-curso', user.cargo);
    this.setText('perfil-campus', user.campus || '');
    this.setText('info-nome-completo', user.nomeCompleto);
    this.setText('info-email', user.email);
  }
}
