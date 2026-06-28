/** Model — cadastros pendentes de aprovação */
let cadastros = [
  { id: 1, nome: 'Pedro Oliveira', email: 'pedro.oliveira@aluno.ifce.edu.br', curso: 'Informática', data: '2026-05-20', status: 'pendente' },
  { id: 2, nome: 'Carla Mendes', email: 'carla.mendes@aluno.ifce.edu.br', curso: 'Edificações', data: '2026-05-18', status: 'pendente' },
  { id: 3, nome: 'Lucas Ferreira', email: 'lucas.ferreira@aluno.ifce.edu.br', curso: 'Redes', data: '2026-05-10', status: 'aprovado' },
];

export class CadastroModel {
  static getAll() {
    return [...cadastros];
  }

  static findById(id) {
    return cadastros.find(c => c.id === id);
  }

  static filter({ status = 'todos', busca = '' } = {}) {
    let lista = CadastroModel.getAll();
    if (status !== 'todos') lista = lista.filter(c => c.status === status);
    if (busca) {
      const b = busca.toLowerCase();
      lista = lista.filter(c =>
        c.nome.toLowerCase().includes(b) ||
        c.email.toLowerCase().includes(b)
      );
    }
    return lista;
  }

  static countByStatus(status) {
    return cadastros.filter(c => c.status === status).length;
  }

  static aprovar(cadastro) {
    if (cadastro) cadastro.status = 'aprovado';
  }

  static recusar(cadastro) {
    if (cadastro) cadastro.status = 'recusado';
  }
}
