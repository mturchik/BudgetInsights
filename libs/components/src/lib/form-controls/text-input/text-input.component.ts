import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Size } from '@budget-insights/models';

@Component({
  selector: 'bi-text-input',
  standalone: true,
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() id = 'text-input';
  @Input() label = 'Text Input';
  @Input() size: Size = 'md';
  @ViewChild('textInput') textInput?: ElementRef<HTMLInputElement>;
  protected disabled = false;

  writeValue(value: string | null): void {
    if (!this.textInput?.nativeElement) return;
    this.textInput.nativeElement.value = value ?? '';
  }

  onChange?: (value: string | null) => void;
  registerOnChange(fn: (value: string | null) => void): void {
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
