/** Model — tickets de refeição */
let tickets = [
  { id: 'TKT-001', aluno: 'Antonio Icaro', turma: 'RDC 2024', refeicao: 'Frango Grelhado', tipo: 'Almoço', data: '2026-05-28', status: 'confirmado', codigo: 'GRA-RDC-7821' },
  { id: 'TKT-002', aluno: 'Maria Silva', turma: 'TI 2024', refeicao: 'Moqueca de Peixe', tipo: 'Almoço', data: '2026-05-28', status: 'utilizado', codigo: 'GRA-TI-4523' },
  { id: 'TKT-003', aluno: 'João Santos', turma: 'EC 2024', refeicao: 'Sopa de Legumes', tipo: 'Jantar', data: '2026-05-27', status: 'cancelado', codigo: 'GRA-EC-9012' },
  { id: 'TKT-004', aluno: 'Ana Costa', turma: 'RDC 2024', refeicao: 'Mingau de Aveia', tipo: 'Café da Manhã', data: '2026-05-29', status: 'confirmado', codigo: 'GRA-RDC-3344' },
  { id: 'TKT-005', aluno: 'Pedro Oliveira', turma: 'TI 2024', refeicao: 'Frango Grelhado', tipo: 'Almoço', data: '2026-05-29', status: 'confirmado', codigo: 'GRA-TI-1189' },
  { id: 'TKT-006', aluno: 'Carla Mendes', turma: 'EC 2024', refeicao: 'Moqueca de Peixe', tipo: 'Almoço', data: '2026-05-29', status: 'utilizado', codigo: 'GRA-EC-5567' },
  { id: 'TKT-007', aluno: 'Lucas Ferreira', turma: 'RDC 2024', refeicao: 'Pão Integral', tipo: 'Café da Tarde', data: '2026-05-28', status: 'confirmado', codigo: 'GRA-RDC-9901' },
  { id: 'TKT-008', aluno: 'Beatriz Lima', turma: 'TI 2024', refeicao: 'Sopa de Legumes', tipo: 'Jantar', data: '2026-05-27', status: 'cancelado', codigo: 'GRA-TI-2234' },
];

export class TicketModel {
  static getAll() {
    return [...tickets];
  }

  static findByCodigo(codigo) {
    return tickets.find(t => t.codigo === codigo);
  }

  static filter({ status = 'todos', turma = 'todas', busca = '' } = {}) {
    let lista = TicketModel.getAll();
    if (status !== 'todos') lista = lista.filter(t => t.status === status);
    if (turma !== 'todas') lista = lista.filter(t => t.turma === turma);
    if (busca) {
      const b = busca.toLowerCase();
      lista = lista.filter(t => t.aluno.toLowerCase().includes(b) || t.codigo.toLowerCase().includes(b));
    }
    return lista;
  }

  static filterByAluno(nomeParcial) {
    return tickets.filter(t => t.aluno.includes(nomeParcial));
  }

  static create(dados) {
    const ticket = { id: `TKT-${tickets.length + 1}`, ...dados };
    tickets.push(ticket);
    return ticket;
  }
}
