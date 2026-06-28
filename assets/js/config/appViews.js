/** Partials do app — edite diretamente em views/html/ */
const V = '../views/html';

export const AUTH_VIEWS = [
  { selector: '#auth-root', url: `${V}/auth/login-screen.html` },
  { selector: '#auth-modals', url: `${V}/auth/modal-cadastro.html` },
  { selector: '#auth-modals', url: `${V}/auth/modal-recuperacao.html`, mode: 'append' },
  { selector: '#shared-root', url: `${V}/shared/notifications.html` },
];

export const APP_LAYOUT = [
  { selector: '#app', url: `${V}/layout/sidebar.html`, mode: 'append' },
  { selector: '#app', url: `${V}/layout/topbar.html`, mode: 'append' },
];

export const APP_PAGES = [
  `${V}/aluno/dash-aluno.html`,
  `${V}/aluno/reserva-refeicoes.html`,
  `${V}/aluno/nutricao.html`,
  `${V}/aluno/ranking.html`,
  `${V}/aluno/feedback.html`,
  `${V}/aluno/votacao.html`,
  `${V}/aluno/desperdicio-aluno.html`,
  `${V}/aluno/financeiro-aluno.html`,
  `${V}/aluno/perfil-aluno.html`,
  `${V}/nutri/gerenciar-tickets.html`,
  `${V}/nutri/dash-nutri.html`,
  `${V}/nutri/gerir-cardapio.html`,
  `${V}/nutri/registrar-desp.html`,
  `${V}/nutri/financeiro-nutri.html`,
  `${V}/nutri/analise.html`,
  `${V}/nutri/relatorios.html`,
  `${V}/nutri/aprova-cadastros.html`,
  `${V}/nutri/gerenciar-ranking.html`,
  `${V}/nutri/perfil-nutri.html`,
];

export const APP_MODALS = `${V}/modals/app-modals.html`;
