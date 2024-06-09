import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'bi-file-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './file-selector.component.html',
  styleUrl: './file-selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileSelectorComponent),
      multi: true,
    },
  ],
})
export class FileSelectorComponent implements ControlValueAccessor {
  @Input() id = 'file-selector';
  @Input() label = 'File Selector';
  @Input() accept: FileAcceptType[] = [FileAcceptType.CSV];
  @Input() multiple = false;
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  protected disabled = false;

  writeValue(files: FileList | null): void {
    if (this.fileInput?.nativeElement)
      this.fileInput.nativeElement.files = files;
  }

  onChange?: (files: FileList | null) => void;
  registerOnChange(fn: (files: FileList | null) => void): void {
    this.onChange = fn;
  }

  onTouched?: () => void;
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFileSelected() {
    if (!this.fileInput?.nativeElement) return;
    this.onChange?.(this.fileInput.nativeElement.files);
  }
}

export enum FileAcceptType {
  CSV = '.csv',
  Excel = 'application/vnd.ms-excel',
  ExcelX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  Text = 'text/plain',
  JSON = 'application/json',
  Image = 'image/*',
  HTML = 'text/html',
  Video = 'video/*',
  Audio = 'audio/*',
  PDF = '.pdf',
}
