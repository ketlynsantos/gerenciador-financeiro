import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transaction';
import { NoTransactions } from "./components/no-transactions/no-transactions";
import { MatAnchor, MatButton, MatButtonModule } from "@angular/material/button";
import { Router, RouterLink } from '@angular/router';
import { TransactionsService } from '../../shared/transaction/services/transactions.service';
import { FeedbackService } from '../../shared/feedback/services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from '../../shared/dialog/confirmation/services/confirmation-dialog.service';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, NoTransactions, MatAnchor, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private transactionsService = inject(TransactionsService)
  private router = inject(Router)
  private feedbackService = inject(FeedbackService)
  private confirmationDialogService = inject(ConfirmationDialogService)

  transactions = signal<Transaction[]>([])

  ngOnInit(): void {
    this.getTransactions()
  }

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id])
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService.open({
      title: 'Deletar transação',
      message: 'Voce realmente quer deletar a transação?'
    }).subscribe({
      next: () => {
        this.transactionsService.delete(transaction.id).subscribe({
          next: () => {
            this.removeTransactionFromArray(transaction);
            this.feedbackService.success('Transação removida com sucesso!')
          }
        })
      }
    })
  }
  
  private removeTransactionFromArray(transaction: Transaction) {
    this.transactions.update(transactions => {
      return transactions.filter(item => item.id !== transaction.id);
    });
  }

  private getTransactions() {
    this.transactionsService.getAll().subscribe({
      next: (response) => this.transactions.set(response)
    })
  }
}
