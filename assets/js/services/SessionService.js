/** Persistência de sessão entre login.html e app.html */
const KEY = 'gra_session';

export class SessionService {
  static save(user) {
    sessionStorage.setItem(KEY, JSON.stringify({ user, role: user.role }));
  }

  static load() {
    try {
      const raw = sessionStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  static clear() {
    sessionStorage.removeItem(KEY);
  }

  static isAuthenticated() {
    return !!SessionService.load();
  }
}
