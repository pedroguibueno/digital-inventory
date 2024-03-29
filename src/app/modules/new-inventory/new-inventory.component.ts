import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IfPerishableValidator } from 'src/app/shared/directives/perishable-validator.directive';
import { QuantityValidator } from 'src/app/shared/directives/quantity-validator.directive';
import { LocationState } from 'src/app/shared/models/location-state.model';
import { MeasurementUnitDropdown, measurementUnitOptions } from 'src/app/shared/models/measurement-unit.model';
import DateUtils from 'src/app/shared/utils/date-utils';
import MoneyUtils from 'src/app/shared/utils/money-utils';
import { InventoryItem } from '../../shared/models/inventory-item.model';
import { InventoryService } from '../../shared/services/inventory.service';

@Component({
  selector: 'new-inventory',
  templateUrl: './new-inventory.component.html',
  providers: [MessageService]
})
export class NewInventoryComponent implements OnInit {

  loading = false;
  inventoryForm: FormGroup;
  updatingId: number|null;
  
  defaultFormValues = {
    name: "",
    measurementUnit: null,
    quantity: null,
    price: null,
    isPerishable: false,
    expirationDate: new Date(),
    manufacturingDate: new Date()
  }

  constructor(
    private ifPerishableValidator: IfPerishableValidator,
    private quantityValidator: QuantityValidator,
    private inventoryService: InventoryService,
    private messageService: MessageService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    const updatingItem: InventoryItem|null = this.getUpdatingInventory()
    this.createForm(updatingItem === null ? this.defaultFormValues : updatingItem);
  }

  getUpdatingInventory(): InventoryItem|null {
    const locationState = this.location.getState() as LocationState;
    const updatingId = locationState.updatingId;
    if(updatingId !== null) {
      const updatingItem = this.inventoryService.getInventoryById(updatingId);
        if(updatingItem !== undefined && updatingItem.id !== undefined) {
          this.updatingId = updatingItem.id;
          return updatingItem;
        }
    }
    return null;
  }

  handleSave(): void {
    this.loading = true;
    const formValues = this.inventoryForm.value;
    const inventoryItem: InventoryItem = {
      id: this.updatingId,
      name: formValues.name,
      measurementUnit: formValues.measurementUnit.name,
      quantity: formValues.quantity,
      price: formValues.price,
      isPerishable: formValues.isPerishable,
      expirationDate: formValues.expirationDate,
      manufacturingDate: formValues.manufacturingDate
    }
    this.inventoryService.saveAsyncInventory(inventoryItem).then(() => {
      this.inventoryForm.reset(this.defaultFormValues);
      this.updatingId = null;
      this.messageService.add({
        severity: "success",
        summary: "Successo",
        detail: "Inventário cadastrado com sucesso"
      })
      this.loading = false;
    });
  }

  createForm(inventory: any): void {
    const selectedMeasurementUnit = measurementUnitOptions.find(item => item.name === inventory.measurementUnit)

    this.inventoryForm = new FormGroup({
      name: new FormControl(inventory.name, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      measurementUnit: new FormControl(selectedMeasurementUnit, [
        Validators.required
      ]),
      quantity: new FormControl(inventory.quantity),
      price: new FormControl(inventory.price, [
        Validators.required
      ]),
      isPerishable: new FormControl(inventory.isPerishable),
      expirationDate: new FormControl(inventory.expirationDate),
      manufacturingDate: new FormControl(inventory.manufacturingDate, [
        Validators.required
      ])
    }, 
    {
      validators: [
        this.ifPerishableValidator.requiredIfPerishable(),
        this.ifPerishableValidator.invalidDateAfterExpirationIfPerishable(),
        this.quantityValidator.quantityByMeasurementUnit()
      ],
      updateOn: "change"
    })  
  }

  isProductExpired(): boolean {
      const expirationDate = this.inventoryForm.controls.expirationDate.value;
      if(expirationDate === null) return false;
      return DateUtils.isBeforeToday(expirationDate);
  }

  filterTextInput(input: string): string {
    return input.replace(/[0-9]/g, '');
  }

  formatMoney(value: string): string {
    return MoneyUtils.formatMoney(value);
  }

  get f(): { [key: string]: AbstractControl; } {return this.inventoryForm.controls}
  get measurementUnits(): MeasurementUnitDropdown[] {return measurementUnitOptions}
  get isUnit(): boolean {return this.inventoryForm.controls.measurementUnit.value?.name === "UNIT"}

}
