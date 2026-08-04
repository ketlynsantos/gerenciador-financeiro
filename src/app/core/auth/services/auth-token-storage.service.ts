import { inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../tokens/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStorageService {
  private readonly key: string = 'auth-token'

  private localStorageToken = inject(LocalStorageToken)
  
  get(): string | null {
    return this.localStorageToken.getItem(this.key)
  }

  has(): boolean {
    return Boolean(this.get())
  }

  set(token: string) {
    this.localStorageToken.setItem(this.key, token)
  }

  remove(): void {
    return this.localStorageToken.removeItem(this.key)
  }
}
