import { Component, computed, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionType } from '@shared/transaction/enums/transaction-type';
import { TransactionsService } from '@shared/transaction/services/transactions.service';
import { Transaction, TransactionPayload } from '@shared/transaction/interfaces/transaction';
import { Router } from '@angular/router';
import { FeedbackService } from '@shared/feedback/services/feedback.service';
import { tap } from 'rxjs';
import { FullWidthDirective } from '@shared/material/form-field/directives/full-width.directive';

@Component({
  selector: 'app-create-or-edit',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAnchor, MatButtonModule, MatButtonToggleModule, NgxMaskDirective, FullWidthDirective],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent {
  private transactionsService = inject(TransactionsService)
  private router = inject(Router)
  private feedbackService = inject(FeedbackService)

  transaction = input<Transaction>()

  readonly transactionType = TransactionType

  isEdit = computed(() => Boolean(this.transaction()))
  form = computed(() => 
    new FormGroup({
    type: new FormControl(this.transaction()?.type ?? '', { validators: [Validators.required]}),
    title: new FormControl(this.transaction()?.title ?? '', { validators: [Validators.required]}),
    value: new FormControl(this.transaction()?.value ?? 0, { validators: [Validators.required]}),
    })
  )

  submit(): void {
    if (this.form().invalid) return

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      value: this.form().value.value as number,
      type: this.form().value.type as TransactionType
    }

    this.createOrEdit(payload).subscribe({
      next: () =>  this.router.navigate(['/'])
    })
  }

  private createOrEdit(payload: TransactionPayload) {
    if (this.isEdit()) {
      return this.transactionsService.put(this.transaction()!.id, payload)
        .pipe(tap(() => this.feedbackService.success('Transação alterada com sucesso!')))
    } else {
      return this.transactionsService.post(payload)
        .pipe(tap(() => this.feedbackService.success('Transação criada com sucesso!')))
    }
  }
}
