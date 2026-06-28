/** Model — usuários e autenticação */
const DEMO_USERS = {
  aluno: {
    role: 'aluno',
    nome: 'Antonio Icaro',
    nomeCompleto: 'Antonio Icaro Silva Santos',
    email: 'antonio.soares08@aluno.ifce.edu.br',
    matricula: '2024001234',
    curso: 'Técnico em Redes de Computadores',
    turma: 'RDC 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=antonio',
    cargo: 'Aluno de Redes de Computadores',
  },
  nutri: {
    role: 'nutri',
    nome: 'Jessica de Lima',
    nomeCompleto: 'Jessica de Lima Silva',
    email: 'jessica.silva@ifce.edu.br',
    matricula: '123456789',
    curso: 'Nutricionista',
    campus: 'IFCE - Campus Boa Viagem',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jessica',
    cargo: 'Nutricionista',
  },
};

export class UserModel {
  static resolveRole(email, fallbackRole = 'aluno') {
    if (email.includes('nutri') || email.includes('jessica')) return 'nutri';
    return fallbackRole;
  }

  static getByRole(role) {
    const user = DEMO_USERS[role];
    return user ? { ...user } : null;
  }

  static login(email, fallbackRole) {
    const role = UserModel.resolveRole(email, fallbackRole);
    const user = UserModel.getByRole(role);
    if (!user) return null;
    user.email = email;
    return user;
  }
}
