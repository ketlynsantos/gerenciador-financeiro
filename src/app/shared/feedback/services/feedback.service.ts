import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private snackbar = inject(MatSnackBar)

  success(message: string): void {
    this.snackbar.open(message, 'OK', {
      panelClass: 'snackbar-success-feedback'
    })
  }
}
