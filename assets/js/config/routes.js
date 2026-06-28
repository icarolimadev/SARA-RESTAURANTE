/** Rotas da aplicação — mapeia goPage() para páginas e perfis */
export const ROUTES = {
  'dash-aluno':        { pageId: 'page-dash-aluno',        title: 'Dashboard',           roles: ['aluno'] },
  'reserva-refeicoes': { pageId: 'page-reserva-refeicoes', title: 'Reservas',            roles: ['aluno'] },
  'nutricao':          { pageId: 'page-nutricao',          title: 'Nutrição',            roles: ['aluno'] },
  'ranking':           { pageId: 'page-ranking',           title: 'Ranking',             roles: ['aluno'] },
  'feedback':          { pageId: 'page-feedback',          title: 'Feedback',            roles: ['aluno'] },
  'votação':           { pageId: 'page-votação',           title: 'Votação',             roles: ['aluno'] },
  'desperdicio-aluno': { pageId: 'page-desperdicio-aluno', title: 'Desperdício',         roles: ['aluno'] },
  'financeiro-aluno':  { pageId: 'page-financeiro-aluno',  title: 'Financeiro',          roles: ['aluno'] },
  'perfil-aluno':      { pageId: 'page-perfil-aluno',      title: 'Perfil',              roles: ['aluno'] },

  'dash-nutri':        { pageId: 'page-dash-nutri',        title: 'Dashboard',           roles: ['nutri'] },
  'gerir-cardapio':    { pageId: 'page-gerir-cardapio',    title: 'Cardápios',           roles: ['nutri'] },
  'gerenciar-tickets': { pageId: 'page-gerenciar-tickets', title: 'Tickets',             roles: ['nutri'] },
  'aprova-cadastros':  { pageId: 'page-aprova-cadastros',  title: 'Aprovar Cadastros',   roles: ['nutri'] },
  'gerenciar-ranking': { pageId: 'page-gerenciar-ranking', title: 'Ranking',             roles: ['nutri'] },
  'registrar-desp':    { pageId: 'page-registrar-desp',    title: 'Desperdício',         roles: ['nutri'] },
  'financeiro-nutri':  { pageId: 'page-financeiro-nutri',  title: 'Financeiro',          roles: ['nutri'] },
  'analise':           { pageId: 'page-analise',           title: 'Análises',            roles: ['nutri'] },
  'relatorios':        { pageId: 'page-relatorios',        title: 'Relatórios',          roles: ['nutri'] },
  'perfil-nutri':      { pageId: 'page-perfil-nutri',      title: 'Meu Perfil',          roles: ['nutri'] },
};

export const DEFAULT_PAGE = { aluno: 'dash-aluno', nutri: 'dash-nutri' };
