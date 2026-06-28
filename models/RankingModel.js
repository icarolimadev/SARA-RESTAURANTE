/** Model — ranking de turmas */
let ranking = [
  { pos: 1, turma: 'TI 2024', ri: 1.8, kg: 8.2 },
  { pos: 2, turma: 'RDC 2024', ri: 2.1, kg: 9.5 },
  { pos: 3, turma: 'EC 2024', ri: 2.5, kg: 11.3 },
  { pos: 4, turma: 'ADM 2024', ri: 3.2, kg: 14.1 },
];

export class RankingModel {
  static getAll() {
    return [...ranking];
  }

  static findByTurma(turma) {
    return ranking.find(r => r.turma === turma);
  }

  static update(turma, pos, ri) {
    const item = RankingModel.findByTurma(turma);
    if (item) {
      item.pos = pos;
      item.ri = ri;
    }
    return item;
  }
}
