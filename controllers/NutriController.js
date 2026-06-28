import { state } from '../models/AppState.js';
import { CardapioModel } from '../models/CardapioModel.js';
import { CadastroModel } from '../models/CadastroModel.js';
import { RankingModel } from '../models/RankingModel.js';
import { DesperdicioModel } from '../models/DesperdicioModel.js';
import { ToastService } from '../assets/js/services/ToastService.js';
import { ModalService } from '../assets/js/services/ModalService.js';
import { NutriView } from '../views/js/NutriView.js';
import { AlunoView } from '../views/js/AlunoView.js';

/** Controller — ações do perfil Nutricionista */
export class NutriController {
  static filterAdminCard(tipo, btn) {
    state.cardapioFiltro = tipo;
    AlunoView.chipActive(btn);
    NutriView.renderCardapio(tipo);
  }

  static openModalCardapio(id) {
    document.getElementById('modal-card-title').textContent = id ? 'Editar Refeição' : 'Nova Refeição';
    ModalService.open('modal-cardapio');
  }

  static salvarCardapio() {
    ModalService.close('modal-cardapio');
    ToastService.show('Refeição salva com sucesso!', 'success');
    NutriView.renderCardapio(state.cardapioFiltro);
  }

  static calcMacros() { /* cálculo automático opcional */ }

  static calcularDesp() {
    const rejeito = parseFloat(document.getElementById('rd-rejeito')?.value) || 0;
    const distribuido = parseFloat(document.getElementById('rd-distribuido')?.value) || 0;
    const alunos = parseInt(document.getElementById('rd-alunos')?.value, 10) || 0;
    const valor = parseFloat(document.getElementById('rd-valor')?.value) || 0;

    if (!rejeito && !distribuido) return;

    const calc = DesperdicioModel.calcular({ rejeito, distribuido, alunos, valor });

    document.getElementById('calc-display').innerHTML = `
      <div class="calc-result">
        <div class="cr-item"><span>Resto Ingestão</span><strong>${calc.aceitacao.toFixed(1)}%</strong></div>
        <div class="cr-item"><span>Índice de Rejeição</span><strong>${calc.ri.toFixed(1)}%</strong></div>
        <div class="cr-item"><span>Valor Perdido</span><strong>R$ ${calc.valorPerdido.toFixed(2)}</strong></div>
        <div class="cr-item"><span>Famílias Alimentadas</span><strong>${calc.familias}</strong></div>
        <div class="cr-item"><span>Média/aluno</span><strong>${calc.mediaAluno.toFixed(0)}g</strong></div>
      </div>`;
  }

  static salvarDesp() {
    ToastService.show('Registro de desperdício salvo!', 'success');
    NutriView.renderDesperdicio();
  }

  static openModalFinanceiro() { ModalService.open('modal-financeiro'); }

  static salvarFinanceiro() {
    ModalService.close('modal-financeiro');
    ToastService.show('Registro financeiro salvo!', 'success');
    NutriView.renderFinanceiro();
  }

  static gerarRel(tipo) {
    ToastService.show(`Relatório ${tipo} gerado com sucesso!`, 'success');
  }

  static filtrarTicketsNutri(status, btn) {
    state.ticketFiltro.status = status;
    AlunoView.chipActive(btn);
    NutriView.renderTickets();
  }

  static filtrarTicketsTurma(turma, btn) {
    state.ticketFiltro.turma = turma;
    AlunoView.chipActive(btn);
    NutriView.renderTickets();
  }

  static buscarTickets(val) {
    state.ticketFiltro.busca = val;
    NutriView.renderTickets();
  }

  static filtrarCadastros(status, btn) {
    state.cadastroFiltro.status = status;
    AlunoView.chipActive(btn);
    NutriView.renderCadastros();
  }

  static buscarCadastrosPendentes(val) {
    state.cadastroFiltro.busca = val;
    NutriView.renderCadastros();
  }

  static revisarCadastro(id) {
    state.cadastroEmRevisao = CadastroModel.findById(id);
    if (!state.cadastroEmRevisao) return;
    document.getElementById('mrc-nome') && (document.getElementById('mrc-nome').textContent = state.cadastroEmRevisao.nome);
    document.getElementById('mrc-email') && (document.getElementById('mrc-email').textContent = state.cadastroEmRevisao.email);
    ModalService.open('modal-revisar-cadastro');
  }

  static aprovarCadastro(cadastro) {
    CadastroModel.aprovar(cadastro);
    ModalService.close('modal-revisar-cadastro');
    ToastService.show('Cadastro aprovado!', 'success');
    NutriView.renderCadastros();
  }

  static recusarCadastro(cadastro) {
    CadastroModel.recusar(cadastro);
    ModalService.close('modal-revisar-cadastro');
    ToastService.show('Cadastro recusado.', 'info');
    NutriView.renderCadastros();
  }

  static editarRanking(turma, pos, ri) {
    state.rankingEmEdicao = { turma, pos, ri };
    document.getElementById('mer-turma').value = turma;
    document.getElementById('mer-pos-ant').value = `${pos}º`;
    document.getElementById('mer-pos-nova').value = pos;
    document.getElementById('mer-ri').value = ri;
    ModalService.open('modal-editar-ranking');
  }

  static salvarAlteracaoRanking() {
    const nova = parseInt(document.getElementById('mer-pos-nova')?.value, 10);
    const ri = parseFloat(document.getElementById('mer-ri')?.value);
    const turma = state.rankingEmEdicao?.turma;
    RankingModel.update(turma, nova, ri);
    ModalService.close('modal-editar-ranking');
    ToastService.show('Ranking atualizado!', 'success');
    NutriView.renderRanking();
    AlunoView.renderRanking();
  }

  static editarCardapio(id) {
    NutriController.openModalCardapio(id);
    const item = CardapioModel.findById(id);
    if (!item) return;
    document.getElementById('mc-nome').value = item.nome;
    document.getElementById('mc-cal').value = item.cal;
  }

  static excluirCardapio(id) {
    CardapioModel.remove(id);
    ToastService.show('Refeição removida.', 'info');
    NutriView.renderCardapio(state.cardapioFiltro);
  }
}
