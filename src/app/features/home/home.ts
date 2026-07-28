import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { NoTransactions } from "./components/no-transactions/no-transactions";
import { MatAnchor, MatButton, MatButtonModule } from "@angular/material/button";
import { Router, RouterLink } from '@angular/router';
import { TransactionsService } from '../../shared/transaction/services/transactions.service';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions, MatAnchor, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private transactionsService = inject(TransactionsService)
  private router = inject(Router)

  transactions = signal<Transaction[]>([])

  ngOnInit(): void {
    this.getTransactions()
  }

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id])
  }
  
  private getTransactions() {
    this.transactionsService.getAll().subscribe({
      next: (response) => this.transactions.set(response)
    })
  }
}
