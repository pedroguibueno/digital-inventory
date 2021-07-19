import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MeasurementUnit, measurementUnitOptions } from 'src/app/shared/models/measurement-unit.model';
import DateUtils from 'src/app/shared/utils/date-utils';
import { InventoryItem } from '../../shared/models/inventory-item.model';
import { InventoryService } from '../../shared/services/inventory.service';

@Component({
  selector: 'list-inventory',
  templateUrl: './list-inventory.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ListInventoryComponent implements OnInit {

  inventories: InventoryItem[];
  loading: boolean = false;

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
      header: 'Deletar registro',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteItem(itemId);
      },
      reject: () => { }
    });
  }

  retrieveInventories() {
    this.loading = true;
    this.inventoryService.getAsyncInventory()
      .then(inventoryList => {
        this.inventories = inventoryList;
        this.loading = false
      });
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
    this.router.navigate(['/new-inventory'], { state: { updatingId: itemId } });
  }

  formatDate(date: Date): string {
    return DateUtils.displayDateString(date);
  }

  getQuantitySymbol(unit: MeasurementUnit): string {
    return measurementUnitOptions.find(item => item.name === unit)?.symbol || "";
  }
}
