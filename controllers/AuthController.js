import { state } from '../models/AppState.js';
import { UserModel } from '../models/UserModel.js';
import { ToastService } from '../assets/js/services/ToastService.js';
import { ModalService } from '../assets/js/services/ModalService.js';
import { SessionService } from '../assets/js/services/SessionService.js';
import { RouterController } from './RouterController.js';

/** Controller — autenticação e cadastro */
export class AuthController {
  static doLogin() {
    const email = document.getElementById('login-email')?.value || '';
    const pass = document.getElementById('login-pass')?.value || '';

    if (!email || !pass) {
      ToastService.show('Preencha e-mail e senha.', 'error');
      return;
    }

    const user = UserModel.login(email, state.role);
    if (!user) {
      ToastService.show('Usuário não encontrado.', 'error');
      return;
    }
    state.setUser(user);
    SessionService.save(user);

    if (document.documentElement.dataset.page === 'auth') {
      window.location.href = '../app/index.html';
      return;
    }

    AuthController._updateSidebar(user);
    RouterController.initAfterLogin();
    ToastService.show(`Bem-vindo, ${user.nome}!`, 'success');
  }

  static doLogout() {
    state.clear();
    SessionService.clear();
    window.location.href = '../auth/login.html';
  }

  static restoreSession() {
    const session = SessionService.load();
    if (!session?.user) return false;
    state.setUser(session.user);
    AuthController._updateSidebar(session.user);
    RouterController.initAfterLogin();
    return true;
  }

  static quickLogin(role) {
    state.role = role;
    const emails = { aluno: 'antonio.soares08@aluno.ifce.edu.br', nutri: 'jessica.silva@ifce.edu.br' };
    const emailEl = document.getElementById('login-email');
    if (emailEl) emailEl.value = emails[role];
    AuthController.doLogin();
  }

  static togglePass(fieldId, btn) {
    let inp, ico;
    if (!fieldId || fieldId === 'login-pass') {
      inp = document.getElementById('login-pass');
      ico = document.getElementById('eye-icon');
    } else {
      inp = document.getElementById(fieldId);
      ico = btn?.querySelector('i');
    }
    if (!inp) return;
    const isPass = inp.type === 'password';
    inp.type = isPass ? 'text' : 'password';
    if (ico) ico.className = `fa fa-eye${isPass ? '-slash' : ''}`;
  }

  static _updateSidebar(user) {
    const isAluno = user.role === 'aluno';
    document.getElementById('nav-aluno')?.classList.toggle('hidden', !isAluno);
    document.getElementById('nav-nutri')?.classList.toggle('hidden', isAluno);
    document.getElementById('sb-name') && (document.getElementById('sb-name').textContent = user.nome);
    document.getElementById('sb-role') && (document.getElementById('sb-role').textContent = user.cargo || user.curso);
    const avatars = ['sb-avatar', 'tb-avatar'];
    avatars.forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.src = user.avatar; el.alt = user.nome; }
    });
  }

  /* ── Modal Cadastro ── */
  static openCadastro() { ModalService.open('overlay-cadastro'); }
  static closeModalcadastro() {
    ModalService.close('overlay-cadastro');
    state.cadastroStep = 1;
    AuthController._showCadastroStep(1);
  }
  static handleOverlayClickcadastro(e) {
    if (e.target.id === 'overlay-cadastro') AuthController.closeModalcadastro();
  }

  static validateNome() {
    const v = document.getElementById('nome')?.value.trim() || '';
    const ok = v.length >= 3;
    AuthController._setFieldStatus('nome', ok, ok ? '' : 'Nome muito curto');
    return ok;
  }
  static validateEmail() {
    const v = document.getElementById('email')?.value.trim() || '';
    const ok = /@(aluno|ifce)\./i.test(v);
    AuthController._setFieldStatus('email', ok, ok ? '' : 'Use e-mail institucional');
    return ok;
  }
  static validateSenha() {
    const v = document.getElementById('senha')?.value || '';
    const ok = v.length >= 8;
    const fill = document.getElementById('forca-fill');
    const label = document.getElementById('forca-label');
    if (fill) fill.style.width = `${Math.min(100, v.length * 12)}%`;
    if (label) label.textContent = v.length < 8 ? 'Fraca' : v.length < 12 ? 'Média' : 'Forte';
    AuthController._setFieldStatus('senha', ok, ok ? '' : 'Mínimo 8 caracteres');
    return ok;
  }
  static validateConfirma() {
    const s = document.getElementById('senha')?.value || '';
    const c = document.getElementById('confirma')?.value || '';
    const ok = s === c && c.length >= 8;
    AuthController._setFieldStatus('confirma', ok, ok ? '' : 'Senhas não coincidem');
    return ok;
  }
  static validateCampus() {
    const v = document.getElementById('campus')?.value || '';
    const ok = !!v;
    AuthController._setFieldStatus('campus', ok, ok ? '' : 'Selecione o campus');
    return ok;
  }

  static nextStep() {
    const step = state.cadastroStep;
    if (step === 1 && !(AuthController.validateNome() && AuthController.validateEmail())) return;
    if (step === 2 && !(AuthController.validateSenha() && AuthController.validateConfirma() && AuthController.validateCampus())) return;
    if (step === 3) {
      const termos = document.getElementById('check-termos')?.classList.contains('checked');
      if (!termos) { ToastService.show('Aceite os termos de uso.', 'error'); return; }
      document.getElementById('success-view')?.classList.add('active');
      document.getElementById('modal-footer')?.classList.add('hidden');
      document.getElementById('modal-body-cadastro')?.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
      const nome = document.getElementById('nome')?.value;
      document.getElementById('success-name') && (document.getElementById('success-name').textContent = nome);
      ToastService.show('Conta criada com sucesso!', 'success');
      return;
    }
    state.cadastroStep++;
    AuthController._showCadastroStep(state.cadastroStep);
    if (state.cadastroStep === 3) AuthController._fillResumo();
  }

  static prevStep() {
    if (state.cadastroStep <= 1) return;
    state.cadastroStep--;
    AuthController._showCadastroStep(state.cadastroStep);
  }

  static _showCadastroStep(n) {
    document.querySelectorAll('#modal-body-cadastro .step-content').forEach((s, i) => {
      s.classList.toggle('active', i + 1 === n);
    });
    document.getElementById('step-num') && (document.getElementById('step-num').textContent = n);
    const descs = ['Dados pessoais', 'Senha e campus', 'Confirmação'];
    document.getElementById('step-desc') && (document.getElementById('step-desc').textContent = descs[n - 1]);
    document.getElementById('btn-back')?.style && (document.getElementById('btn-back').style.display = n > 1 ? 'flex' : 'none');
    [0, 1, 2].forEach(i => document.getElementById(`seg-${i}`)?.classList.toggle('active', i < n));
  }

  static _fillResumo() {
    document.getElementById('resumo-nome') && (document.getElementById('resumo-nome').textContent = '👤 ' + (document.getElementById('nome')?.value || ''));
    document.getElementById('resumo-email') && (document.getElementById('resumo-email').textContent = '📧 ' + (document.getElementById('email')?.value || ''));
    document.getElementById('resumo-campus') && (document.getElementById('resumo-campus').textContent = '🏫 ' + (document.getElementById('campus')?.value || ''));
  }

  static toggleCheck(el) { el?.classList.toggle('checked'); }

  static previewAvatar(input) {
    const file = input?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.getElementById('avatar-img');
      const emoji = document.getElementById('avatar-emoji');
      if (img) { img.src = e.target.result; img.style.display = 'block'; }
      if (emoji) emoji.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  static _setFieldStatus(field, ok, msg) {
    const status = document.getElementById(`${field}-status`);
    const err = document.getElementById(`${field}-err`);
    if (status) status.innerHTML = ok ? '<i class="fa fa-check"></i>' : '';
    if (err) err.textContent = msg;
  }

  /* ── Recuperação de senha ── */
  static closeModalrecuperacao() { ModalService.close('overlay-recuperacao'); }
  static handleOverlayClickrec(e) {
    if (e.target.id === 'overlay-recuperacao') AuthController.closeModalrecuperacao();
  }
  static enviarRecuperacao() {
    const email = document.getElementById('recuperar-email')?.value.trim();
    if (!email) { ToastService.show('Informe seu e-mail.', 'error'); return; }
    document.getElementById('success-view-recuperacao')?.classList.add('active');
    ToastService.show('Instruções enviadas!', 'success');
  }
}
