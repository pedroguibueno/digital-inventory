import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
  
  @Directive({
    selector: '[transformInput][formControlName]'
  })
  export class TransformInputDirective implements OnInit, OnDestroy {
    @Input('transformInput') transform: (value: any) => any = val => val;
  
    elem = this.elementRef.nativeElement;
  
    sub!: Subscription;
  
    constructor(public ngControl: NgControl, private elementRef: ElementRef) {}
  
    ngOnInit(): void {
      if (!this.sub && this.ngControl.valueChanges) this.sub = this.ngControl.valueChanges.subscribe(value => {
          const newValue = this.transform(value);
          if (value !== newValue) {
            this.ngControl?.control?.setValue(newValue)
          }
        })
    }
  
    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
  }
  