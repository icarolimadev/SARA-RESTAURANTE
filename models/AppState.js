/** Estado global da aplicação (Model) */
class AppState {
  constructor() {
    this.role = 'aluno';
    this.currentPage = 'dash-aluno';
    this.user = null;
    this.cadastroEmRevisao = null;
    this.ticketFiltro = { status: 'todos', turma: 'todas', busca: '' };
    this.cadastroFiltro = { status: 'pendente', busca: '' };
    this.cardapioFiltro = 'todos';
    this.rankingEmEdicao = null;
    this.cadastroStep = 1;
    this.charts = {};
  }

  setUser(user) {
    this.user = user;
    this.role = user.role;
  }

  clear() {
    this.user = null;
    this.role = 'aluno';
    this.currentPage = 'dash-aluno';
    this.cadastroEmRevisao = null;
  }
}

export const state = new AppState();
