import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import { DialogData } from '../../interfaces/dialog-data'

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef)
  readonly dialogData = signal(inject<DialogData>(MAT_DIALOG_DATA))

  private defaultDialogData: Partial<DialogData> = {
    noBtnText: 'Não',
    yesBtnText: 'Sim'
  }

  resolvedDialogData = computed(() => {
    return {
      ...this.defaultDialogData,
      ...this.dialogData()
    }
  })
}
