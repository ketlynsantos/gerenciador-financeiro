import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { Transaction } from '@shared/transaction/interfaces/transaction';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationDialogService } from '@shared/dialog/confirmation/services/confirmation-dialog.service';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { Balance } from './components/balance/balance';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { NoTransactions } from './components/no-transactions/no-transactions';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { TransactionsContainerComponent } from './components/transactions-container/transactions-container.component';

@Component({
  selector: 'app-list',
  imports: [Balance, TransactionItem, NoTransactions, MatAnchor, MatButtonModule, RouterLink, TransactionsContainerComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private transactionsService = inject(TransactionsService)
  private router = inject(Router)
  private feedbackService = inject(FeedbackService)
  private confirmationDialogService = inject(ConfirmationDialogService)

  transactions = input.required<Transaction[]>()
  items = linkedSignal(() => this.transactions())

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
    this.items.update(transactions => {
      return transactions.filter(item => item.id !== transaction.id);
    });
  }
}
