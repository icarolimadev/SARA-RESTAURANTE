/** Carrega partials HTML em tempo de execução — sem script de build */
export class ViewLoader {
  static async fetchHtml(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Não foi possível carregar: ${url}`);
    return res.text();
  }

  static async inject(selector, url, mode = 'inner') {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return;
    const html = await this.fetchHtml(url);
    if (mode === 'append') el.insertAdjacentHTML('beforeend', html);
    else el.innerHTML = html;
  }

  static async loadAll(items) {
    await Promise.all(items.map(({ selector, url, mode }) => this.inject(selector, url, mode)));
  }
}
