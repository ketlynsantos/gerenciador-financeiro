import { inject, Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from '@shared/dialog/confirmation/components/confirmation-dialog/confirmation-dialog.component'
import { filter } from 'rxjs';
import { DialogData } from '@shared/dialog/confirmation/interfaces/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private dialog = inject(MatDialog)

  open(data: DialogData) {
    return this.dialog
      .open(ConfirmationDialogComponent, { data })
      .afterClosed()
      .pipe(filter((response: boolean) => response === true))
  }
}
