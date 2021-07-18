import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import DateUtils from 'src/app/shared/utils/date-utils';
import { InventoryItem } from '../shared/models/inventory-item.model';
import { MeasurementUnit, measurementUnitOptions } from '../shared/models/measurement-unit.model';
import { InventoryService } from '../shared/services/inventory.service';

@Component({
  selector: 'list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListInventoryComponent implements OnInit {

  inventories: InventoryItem[];

  constructor(
    private messageService: MessageService,
    private inventoryService: InventoryService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.retrieveInventories();
  }

  confirmDelete(itemId: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar este registros?',
      header: 'Confirmação de deleção',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteItem(itemId);
      },
      reject: () => { }
    });
  }

  retrieveInventories() {
    this.inventories = this.inventoryService.getInventory();
    debugger;
  }

  deleteItem(itemId: number) {
    this.inventoryService.deleteInventory(itemId);
    this.messageService.add({
      severity: "success",
      summary: "Successo",
      detail: "Inventário deletado com sucesso"
    })
    this.retrieveInventories();
  }

  editItem(itemId: number) {
    this.router.navigate(['/new-inventory'], {state: {updatingId: itemId}});
  }

  formatDate(date: Date): string {
    return DateUtils.displayDateString(date);
  }

  getQuantitySymbol(unit: MeasurementUnit): string {
    return measurementUnitOptions.find(item => item.name === unit)?.symbol || "";
  }


}