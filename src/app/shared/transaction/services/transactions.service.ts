import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionPayload } from '@shared/transaction/interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient)

  getAll() {
    return this.httpClient.get<Transaction[]>('/api/transactions')
  }

  getById(id: string) {
    return this.httpClient.get<Transaction>(`/api/transactions/${id}`)
  }

  post(payload: TransactionPayload) {
    return this.httpClient.post<Transaction>('/api/transactions', payload)
  }

  put(id: number, payload: TransactionPayload) {
    return this.httpClient.put<Transaction>(`/api/transactions/${id}`, payload)
  }

  delete(id: number) {
    return this.httpClient.delete<Transaction>(`/api/transactions/${id}`)
  }
}
