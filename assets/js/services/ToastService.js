/** Serviço de notificações toast (View helper) */
export class ToastService {
  static show(msg, type = 'info') {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;
    const el = document.createElement('div');
    const typeClass = type === 'error' ? 'error' : type === 'warn' ? 'warn' : '';
    el.className = `toast ${typeClass}`.trim();
    el.innerHTML = `<i class="fa fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${msg}`;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
}
