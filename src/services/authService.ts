import type { User } from '../types';
import { currentUser } from '../data/mockData';

const AUTH_USER_KEY = 'agrivision_user_v1';

class AuthService {
  public getUser(): User {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
    return currentUser;
  }

  public updateUser(updated: Partial<User>): User {
    const user = { ...this.getUser(), ...updated };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return user;
  }

  public login(email: string, _password?: string): User {
    const user: User = {
      ...currentUser,
      email: email || currentUser.email,
    };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return user;
  }

  public logout(): void {
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

export const authService = new AuthService();
