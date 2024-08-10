import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileType, Size } from '@budget-insights/models';

@Component({
  selector: 'bi-file-selector',
  standalone: true,
  imports: [],
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
  @Input() size: Size = 'md';
  @Input() accept: FileType[] = [FileType.CSV];
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
}
