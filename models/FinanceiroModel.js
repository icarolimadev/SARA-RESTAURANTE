/** Model — dados financeiros */
const registros = [
  { periodo: 'Semana 21', refeicoes: 1280, total: 18560, perdido: 1240, custoAluno: 14.50, economia: 890 },
  { periodo: 'Semana 20', refeicoes: 1260, total: 18270, perdido: 1380, custoAluno: 14.50, economia: 760 },
];

export class FinanceiroModel {
  static getAll() {
    return [...registros];
  }
}
