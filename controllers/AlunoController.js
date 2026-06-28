import { CardapioModel } from '../models/CardapioModel.js';
import { TicketModel } from '../models/TicketModel.js';
import { ToastService } from '../assets/js/services/ToastService.js';
import { ModalService } from '../assets/js/services/ModalService.js';
import { AlunoView } from '../views/js/AlunoView.js';

/** Controller — ações do perfil Aluno */
export class AlunoController {
  static reservarRefeicao(id) {
    const refeicao = CardapioModel.findById(id);
    if (!refeicao) return;
    const codigo = `GRA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    TicketModel.create({
      aluno: 'Antonio Icaro',
      turma: 'RDC 2024',
      refeicao: refeicao.nome,
      tipo: refeicao.tipo,
      data: new Date().toISOString().split('T')[0],
      status: 'confirmado',
      codigo,
    });
    ToastService.show(`Reserva confirmada! Código: ${codigo}`, 'success');
    AlunoView.renderReservas();
  }

  static abrirTicket(codigo) {
    const ticket = TicketModel.findByCodigo(codigo);
    if (!ticket) return;
    document.getElementById('mt-codigo') && (document.getElementById('mt-codigo').textContent = codigo);
    document.getElementById('mt-aluno') && (document.getElementById('mt-aluno').textContent = ticket.aluno);
    document.getElementById('mt-refeicao') && (document.getElementById('mt-refeicao').textContent = ticket.refeicao);
    ModalService.open('modal-ticket');
  }

  static copiarCodigoTicket(codigo) {
    navigator.clipboard?.writeText(codigo);
    ToastService.show('Código copiado!', 'success');
  }

  static editarRestricoes() {
    ToastService.show('Edição de restrições em breve.', 'info');
  }

  static abrirModalSenha() { ToastService.show('Alteração de senha em breve.', 'info'); }
  static abrirModalFoto() { ToastService.show('Upload de foto em breve.', 'info'); }
  static abrirModalEditar() { ToastService.show('Edição de perfil em breve.', 'info'); }
}
