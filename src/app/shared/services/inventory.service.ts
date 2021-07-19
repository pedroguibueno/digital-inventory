import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  getNextId(): number {
    const lastId = localStorage.getItem('lastId');
    if(lastId === null) {
      localStorage.setItem('lastId', '0')
      return 0;
    }
    const nextId = parseInt(lastId, 10) + 1;
    localStorage.setItem('lastId', nextId.toString())
    return nextId;
  }

  getInventory(): InventoryItem[] {
    const storageData = localStorage.getItem('inventory');
    if(storageData !== null) return JSON.parse(storageData);
    return [];
  }

  async getAsyncInventory(): Promise<InventoryItem[]> {
    return new Promise<InventoryItem[]>(resolve =>
      setTimeout(resolve, 800))
      .then(() => this.getInventory());
  }

  async saveAsyncInventory(item: InventoryItem): Promise<boolean> {
    return new Promise<boolean>(resolve =>
      setTimeout(resolve, 800))
      .then(() => {
        this.saveInventory(item);
        return true;
      });
  }

  saveInventory(item: InventoryItem) {
    let inventories = this.getInventory();
    if(item.id === null || item.id === undefined) {
      item.id = this.getNextId()
      inventories.push(item);
    } else {
      const editingIndex = inventories.findIndex(inventory => inventory.id === item.id);
      inventories[editingIndex] = item;
    }
    localStorage.setItem('inventory', JSON.stringify(inventories));
  }

  deleteInventory(itemId: number) {
    let inventories = this.getInventory();
    inventories = inventories.filter(item => item.id !== itemId);
    localStorage.setItem('inventory', JSON.stringify(inventories));
  }

  getInventoryById(itemId: number): InventoryItem | undefined {
    let inventory = this.getInventory().find(item => item.id === itemId);
    if(inventory == undefined) return inventory;

    inventory.expirationDate = (inventory.expirationDate !== null) ? new Date(inventory.expirationDate) : null;
    inventory.manufacturingDate = new Date(inventory.manufacturingDate);
    return inventory;
  }
}
