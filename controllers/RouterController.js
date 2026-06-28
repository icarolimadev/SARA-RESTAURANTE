import { ROUTES, DEFAULT_PAGE } from '../assets/js/config/routes.js';
import { state } from '../models/AppState.js';
import { AlunoView } from '../views/js/AlunoView.js';
import { NutriView } from '../views/js/NutriView.js';
import { NotificacaoModel } from '../models/NotificacaoModel.js';

/** Controller — navegação entre telas */
export class RouterController {
  static initAfterLogin() {
    const page = DEFAULT_PAGE[state.role] || 'dash-aluno';
    RouterController.goPage(page);
    RouterController._renderNotifs();
  }

  static goPage(pageKey, navEl) {
    const route = ROUTES[pageKey];
    if (!route) return;

    if (!route.roles.includes(state.role)) {
      const fallback = DEFAULT_PAGE[state.role];
      if (fallback) RouterController.goPage(fallback, navEl);
      return;
    }

    state.currentPage = pageKey;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(route.pageId)?.classList.add('active');

    document.getElementById('tb-title') && (document.getElementById('tb-title').textContent = route.title);

    const navId = state.role === 'aluno' ? 'nav-aluno' : 'nav-nutri';
    document.querySelectorAll(`#${navId} .sbn-link`).forEach(l => l.classList.remove('active'));
    if (navEl) navEl.classList.add('active');
    else {
      const links = document.querySelectorAll(`#${navId} .sbn-link`);
      links.forEach(l => {
        if (l.getAttribute('onclick')?.includes(`'${pageKey}'`)) l.classList.add('active');
      });
    }

    RouterController._renderPage(pageKey);
    RouterController.closeSidebar();
  }

  static _renderPage(pageKey) {
    const user = state.user;
    const renderers = {
      'dash-aluno': () => AlunoView.renderDashboard(user),
      'reserva-refeicoes': () => AlunoView.renderReservas(),
      'nutricao': () => AlunoView.renderNutricao(),
      'ranking': () => AlunoView.renderRanking(),
      'desperdicio-aluno': () => AlunoView.renderDesperdicio(),
      'financeiro-aluno': () => AlunoView.renderFinanceiro(),
      'perfil-aluno': () => AlunoView.renderPerfil(user),

      'dash-nutri': () => NutriView.renderDashboard(),
      'gerir-cardapio': () => NutriView.renderCardapio(state.cardapioFiltro),
      'gerenciar-tickets': () => NutriView.renderTickets(),
      'registrar-desp': () => NutriView.renderDesperdicio(),
      'financeiro-nutri': () => NutriView.renderFinanceiro(),
      'analise': () => NutriView.renderAnalise(),
      'aprova-cadastros': () => NutriView.renderCadastros(),
      'gerenciar-ranking': () => NutriView.renderRanking(),
      'perfil-nutri': () => NutriView.renderPerfil(user),
    };
    renderers[pageKey]?.();
  }

  static toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('open');
  }

  static closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
  }

  static toggleNotifs() {
    document.getElementById('notif-panel')?.classList.toggle('hidden');
    document.getElementById('notif-overlay')?.classList.toggle('hidden');
  }

  static closeNotifs() {
    document.getElementById('notif-panel')?.classList.add('hidden');
    document.getElementById('notif-overlay')?.classList.add('hidden');
  }

  static _renderNotifs() {
    const naoLidas = NotificacaoModel.countNaoLidas();
    const dot = document.getElementById('notif-dot');
    if (dot) dot.style.display = naoLidas ? 'block' : 'none';
    const list = document.getElementById('notif-list');
    if (list) {
      list.innerHTML = NotificacaoModel.getAll().map(n => `
        <div class="notif-item ${n.lida ? '' : 'unread'}">
          <p>${n.texto}</p><small>${n.tempo}</small>
        </div>`).join('');
    }
  }
}
