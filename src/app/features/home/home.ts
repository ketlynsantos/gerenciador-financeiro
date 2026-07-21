import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { NoTransactions } from "./components/no-transactions/no-transactions";
import { TransactionsService } from '../../shared/transaction/services/transactions';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private transactionsService = inject(TransactionsService)

  transactions = signal<Transaction[]>([])

  ngOnInit(): void {
    this.getTransactions()
  }
  
  private getTransactions() {
    this.transactionsService.getAll().subscribe({
      next: (response) => this.transactions.set(response)
    })
  }
}
