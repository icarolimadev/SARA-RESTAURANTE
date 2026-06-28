/**
 * GRA — Gestão de Refeições Acadêmicas
 * Entry point MVC — carrega telas dinamicamente, sem build
 */
import { state } from '../../models/AppState.js';
import { AuthController } from '../../controllers/AuthController.js';
import { RouterController } from '../../controllers/RouterController.js';
import { AlunoController } from '../../controllers/AlunoController.js';
import { NutriController } from '../../controllers/NutriController.js';
import { ModalService } from './services/ModalService.js';
import { SessionService } from './services/SessionService.js';
import { ViewLoader } from './services/ViewLoader.js';
import { AUTH_VIEWS, APP_LAYOUT, APP_PAGES, APP_MODALS } from './config/appViews.js';

const PATHS = {
  auth: '../auth/login.html',
  app: '../app/index.html',
};

/** Expõe API global para handlers inline do HTML */
const api = {
  state,
  doLogin: () => AuthController.doLogin(),
  doLogout: () => AuthController.doLogout(),
  quickLogin: (role) => AuthController.quickLogin(role),
  togglePass: (field, btn) => AuthController.togglePass(field, btn),
  closeModalcadastro: () => AuthController.closeModalcadastro(),
  handleOverlayClickcadastro: (e) => AuthController.handleOverlayClickcadastro(e),
  validateNome: () => AuthController.validateNome(),
  validateEmail: () => AuthController.validateEmail(),
  validateSenha: () => AuthController.validateSenha(),
  validateConfirma: () => AuthController.validateConfirma(),
  validateCampus: () => AuthController.validateCampus(),
  nextStep: () => AuthController.nextStep(),
  prevStep: () => AuthController.prevStep(),
  toggleCheck: (el) => AuthController.toggleCheck(el),
  previewAvatar: (input) => AuthController.previewAvatar(input),
  closeModalrecuperacao: () => AuthController.closeModalrecuperacao(),
  handleOverlayClickrec: (e) => AuthController.handleOverlayClickrec(e),
  enviarRecuperacao: () => AuthController.enviarRecuperacao(),
  goPage: (page, el) => RouterController.goPage(page, el),
  toggleSidebar: () => RouterController.toggleSidebar(),
  closeSidebar: () => RouterController.closeSidebar(),
  toggleNotifs: () => RouterController.toggleNotifs(),
  closeNotifs: () => RouterController.closeNotifs(),
  closeModalById: (id, e) => ModalService.closeById(id, e),
  reservarRefeicao: (id) => AlunoController.reservarRefeicao(id),
  abrirTicket: (code) => AlunoController.abrirTicket(code),
  copiarCodigoTicket: (code) => AlunoController.copiarCodigoTicket(code),
  editarRestricoes: () => AlunoController.editarRestricoes(),
  abrirModalSenha: () => AlunoController.abrirModalSenha(),
  abrirModalFoto: () => AlunoController.abrirModalFoto(),
  abrirModalEditar: () => AlunoController.abrirModalEditar(),
  filterAdminCard: (t, btn) => NutriController.filterAdminCard(t, btn),
  openModalCardapio: (id) => NutriController.openModalCardapio(id),
  salvarCardapio: () => NutriController.salvarCardapio(),
  calcMacros: () => NutriController.calcMacros(),
  calcularDesp: () => NutriController.calcularDesp(),
  salvarDesp: () => NutriController.salvarDesp(),
  openModalFinanceiro: () => NutriController.openModalFinanceiro(),
  salvarFinanceiro: () => NutriController.salvarFinanceiro(),
  gerarRel: (t) => NutriController.gerarRel(t),
  filtrarTicketsNutri: (s, btn) => NutriController.filtrarTicketsNutri(s, btn),
  filtrarTicketsTurma: (t, btn) => NutriController.filtrarTicketsTurma(t, btn),
  buscarTickets: (v) => NutriController.buscarTickets(v),
  filtrarCadastros: (s, btn) => NutriController.filtrarCadastros(s, btn),
  buscarCadastrosPendentes: (v) => NutriController.buscarCadastrosPendentes(v),
  revisarCadastro: (id) => NutriController.revisarCadastro(id),
  aprovarCadastro: (c) => NutriController.aprovarCadastro(c),
  recusarCadastro: (c) => NutriController.recusarCadastro(c),
  editarRanking: (t, p, r) => NutriController.editarRanking(t, p, r),
  salvarAlteracaoRanking: () => NutriController.salvarAlteracaoRanking(),
  editarCardapio: (id) => NutriController.editarCardapio(id),
  excluirCardapio: (id) => NutriController.excluirCardapio(id),
};

Object.assign(window, api);

async function loadAuthPage() {
  await ViewLoader.loadAll(AUTH_VIEWS);
  if (SessionService.isAuthenticated()) {
    window.location.replace(PATHS.app);
    return;
  }
  document.querySelectorAll('.lf-register a, .lf-forgot').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      if (el.classList.contains('lf-forgot')) ModalService.open('overlay-recuperacao');
      else AuthController.openCadastro();
    });
  });
}

async function loadAppPage() {
  if (!SessionService.isAuthenticated()) {
    window.location.replace(PATHS.auth);
    return;
  }
  await ViewLoader.loadAll(APP_LAYOUT);
  const app = document.getElementById('app');
  const main = document.createElement('main');
  main.className = 'main';
  main.id = 'main';
  app.appendChild(main);
  for (const url of APP_PAGES) {
    await ViewLoader.inject(main, url, 'append');
  }
  await ViewLoader.inject('#app-modals', APP_MODALS);
  await ViewLoader.inject('#shared-root', '../views/html/shared/notifications.html');
  AuthController.restoreSession();
  const rdData = document.getElementById('rd-data');
  if (rdData) rdData.value = new Date().toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', async () => {
  const page = document.documentElement.dataset.page;
  try {
    if (page === 'auth') await loadAuthPage();
    else if (page === 'app') await loadAppPage();
  } catch (err) {
    console.error(err);
    document.body.insertAdjacentHTML('beforeend',
      `<p style="padding:24px;color:#c62828">Erro ao carregar telas. Use um servidor local (ex: python -m http.server).</p>`);
  }
});

export default api;
