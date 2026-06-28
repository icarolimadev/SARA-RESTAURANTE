/** Model — registros de desperdício */
const registros = [
  { data: '2026-05-26', tipo: 'Almoço', alunos: 320, distribuido: 224, rejeito: 12.5, ri: 5.6, valorPerdido: 187.50 },
  { data: '2026-05-25', tipo: 'Almoço', alunos: 315, distribuido: 220, rejeito: 10.2, ri: 4.6, valorPerdido: 153.00 },
];

export class DesperdicioModel {
  static getAll() {
    return [...registros];
  }

  static calcular({ rejeito, distribuido, alunos, valor }) {
    const ri = distribuido ? ((rejeito / distribuido) * 100) : 0;
    const aceitacao = 100 - ri;
    const valorPerdido = distribuido ? ((rejeito / distribuido) * valor) : 0;
    const familias = Math.round(rejeito / 0.35);
    const mediaAluno = alunos ? (rejeito / alunos * 1000) : 0;
    return { ri, aceitacao, valorPerdido, familias, mediaAluno };
  }
}
