import { User, RegisterData, LoginData } from '../types/auth';

const STORAGE_KEY = 'benzcheck_auth';
const USERS_KEY = 'benzcheck_users';

function getUsers(): Array<User & { password: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: Array<User & { password: string }>): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredSession(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const authService = {
  /**
   * Registra um novo usuário. Retorna erro se e-mail já cadastrado.
   */
  register(data: RegisterData): User {
    const users = getUsers();
    const existing = users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existing) {
      throw new Error('Este e-mail já está cadastrado. Faça login.');
    }

    const newUser: User & { password: string } = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);

    const session: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Autentica um usuário existente.
   */
  login(data: LoginData): User {
    const users = getUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase() &&
        u.password === data.password
    );
    if (!found) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const session: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      createdAt: found.createdAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Encerra a sessão atual.
   */
  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Retorna o usuário logado ou null.
   */
  getCurrentUser(): User | null {
    return getStoredSession();
  },

  isAuthenticated(): boolean {
    return getStoredSession() !== null;
  },
};
