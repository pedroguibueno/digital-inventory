import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import DateUtils from "../../../shared/utils/date-utils";

@Injectable({providedIn: 'root'})
export class IfPerishableValidator {
    public requiredIfPerishable(): ValidatorFn {
        return (control: AbstractControl) => {
            const isPerishable = control.get("isPerishable");
            const expirationDate = control.get("expirationDate");
           
            if(isPerishable?.value === true &&
                 expirationDate?.value === null) {
                    return {requiredExpiration: true};
                 }
            return null;
        }
    }

    public invalidDateAfterExpirationIfPerishable(): ValidatorFn {
        return (control: AbstractControl) => {
            const isPerishable = control.get("isPerishable");
            const expirationDate = control.get("expirationDate"); 
            const manufacturingDate = control.get("manufacturingDate");

            if(expirationDate?.value === null || manufacturingDate?.value === null) return null;

            if(isPerishable?.value === true &&
                DateUtils.isDateAfter(manufacturingDate?.value, expirationDate?.value)) {
                    return {manufactingDateAfterExpiration: true}
                }

            return null;
        }
    }
}

