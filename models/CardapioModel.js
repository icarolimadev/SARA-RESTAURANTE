/** Model — cardápio e refeições */
let cardapio = [
  { id: 1, dia: 'Segunda', tipo: 'almoco', nome: 'Frango Grelhado ao Molho de Ervas', cal: 650, carb: 75, prot: 38, lip: 18 },
  { id: 2, dia: 'Segunda', tipo: 'cafe-manha', nome: 'Mingau de Aveia com Frutas', cal: 320, carb: 52, prot: 12, lip: 8 },
  { id: 3, dia: 'Terça', tipo: 'almoco', nome: 'Moqueca de Peixe', cal: 580, carb: 45, prot: 42, lip: 22 },
  { id: 4, dia: 'Terça', tipo: 'jantar', nome: 'Sopa de Legumes', cal: 280, carb: 38, prot: 14, lip: 6 },
  { id: 5, dia: 'Quarta', tipo: 'cafe-tarde', nome: 'Pão Integral com Queijo', cal: 240, carb: 30, prot: 10, lip: 9 },
];

export const TIPO_LABELS = {
  'cafe-manha': '☀️ Café da Manhã',
  'almoco': '🍽️ Almoço',
  'cafe-tarde': '🍵 Café da Tarde',
  'jantar': '🌙 Jantar',
};

export class CardapioModel {
  static getAll() {
    return [...cardapio];
  }

  static findById(id) {
    return cardapio.find(c => c.id === id);
  }

  static filterByTipo(tipo) {
    if (tipo === 'todos') return CardapioModel.getAll();
    return cardapio.filter(c => c.tipo === tipo);
  }

  static remove(id) {
    const idx = cardapio.findIndex(c => c.id === id);
    if (idx >= 0) cardapio.splice(idx, 1);
  }
}
