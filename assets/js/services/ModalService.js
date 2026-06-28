/** Serviço de modais */
export class ModalService {
  static open(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  }

  static close(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  }

  static closeById(id, event) {
    if (event && event.target !== event.currentTarget) return;
    this.close(id);
  }
}
