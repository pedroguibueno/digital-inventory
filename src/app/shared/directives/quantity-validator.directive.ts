import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MeasurementUnit } from "../models/measurement-unit.model";
import DateUtils from "../utils/date-utils";

@Injectable({providedIn: 'root'})
export class QuantityValidator {
    public quantityByMeasurementUnit(): ValidatorFn {
        return (control: AbstractControl) => {
            const quantity = control.get("quantity")?.value;
            const measurementUnit = control.get("measurementUnit")?.value;
           
            if(quantity === null) return null;

            if(measurementUnit?.name === MeasurementUnit.unit){
                if(quantity % 1 !== 0) return {invalidQuantityUnit: true}
            } else {
                if(quantity.toString().split(".")[1] && quantity.toString().split(".")[1].length > 3) return {invalidQuantityDecimal: true}
            }

            return null;
        }
    }
}

