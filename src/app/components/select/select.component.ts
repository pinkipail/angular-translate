import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T> implements OnInit, ControlValueAccessor {

  @Input() public options: T[];
  @Input() public defaultName: string;
  @Input() public valueKey = 'value';
  @Input() public labelKey = 'value';

  private onChange: (value: T) => void;

  public selectedOption: T;

  writeValue(value: T): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: T): void { }

  public ngOnInit(): void {
  }


  public select(language: T): void {
    this.selectedOption = language;
    this.onChange(language);
  }
}
