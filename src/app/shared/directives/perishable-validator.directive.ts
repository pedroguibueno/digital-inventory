import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import DateUtils from "../utils/date-utils";

@Injectable({providedIn: 'root'})
export class IfPerishableValidator {
    public requiredIfPerishable(): ValidatorFn {
        return (control: AbstractControl) => {
            const isPerishable = control.get("isPerishable")?.value;
            const expirationDate = control.get("expirationDate")?.value;
           
            if(isPerishable === true &&
                 expirationDate === null) {
                    return {requiredExpiration: true};
                 }
            return null;
        }
    }

    public invalidDateAfterExpirationIfPerishable(): ValidatorFn {
        return (control: AbstractControl) => {
            const isPerishable = control.get("isPerishable")?.value;
            const expirationDate = control.get("expirationDate")?.value; 
            const manufacturingDate = control.get("manufacturingDate")?.value;

            if(expirationDate === null || manufacturingDate === null) return null;

            if(isPerishable === true &&
                DateUtils.isDateAfter(manufacturingDate, expirationDate)) {
                    return {manufactingDateAfterExpiration: true}
                }

            return null;
        }
    }
}

