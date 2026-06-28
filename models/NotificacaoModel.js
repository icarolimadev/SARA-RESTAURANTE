/** Model — notificações do sistema */
const notificacoes = [
  { id: 1, texto: 'Sua reserva de almoço foi confirmada', tempo: '2 min', lida: false },
  { id: 2, texto: 'Turma RDC 2024 subiu para 2º no ranking', tempo: '1h', lida: false },
  { id: 3, texto: 'Novo cardápio disponível para amanhã', tempo: '3h', lida: true },
];

export class NotificacaoModel {
  static getAll() {
    return [...notificacoes];
  }

  static countNaoLidas() {
    return notificacoes.filter(n => !n.lida).length;
  }
}
