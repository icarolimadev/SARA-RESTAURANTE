/** Classe base para Views */
export class BaseView {
  static $(id) {
    return document.getElementById(id);
  }

  static setHTML(id, html) {
    const el = this.$(id);
    if (el) el.innerHTML = html;
  }

  static setText(id, text) {
    const el = this.$(id);
    if (el) el.textContent = text;
  }

  static kpiCard(icon, label, value, sub = '', color = 'green') {
    return `<div class="kpi-card kpi-${color}">
      <div class="kpi-icon">${icon}</div>
      <div class="kpi-body">
        <div class="kpi-val">${value}</div>
        <div class="kpi-label">${label}</div>
        ${sub ? `<div class="kpi-sub">${sub}</div>` : ''}
      </div>
    </div>`;
  }

  static chipActive(btn) {
    btn?.closest('.filter-chips, #tickets-filter-status, #tickets-filter-turma, #cadastros-filter-status')
      ?.querySelectorAll('.chip')
      .forEach(c => c.classList.remove('active'));
    btn?.classList.add('active');
  }
}
