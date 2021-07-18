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
    const nextId = lastId + 1;
    localStorage.setItem('lastId', nextId.toString())
    return parseInt(nextId, 10);
  }

  getInventory(): InventoryItem[] {
    const storageData = localStorage.getItem('inventory');
    let inventories;
    if(storageData !== null) return JSON.parse(storageData);
    return [];
  }

  saveInventory(item: InventoryItem) {
    let inventories = this.getInventory();
    if(item.id === null) {
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

    inventory.expirationDate = new Date(inventory.expirationDate);
    inventory.manufacturingDate = new Date(inventory.manufacturingDate);
    return inventory;
  }
}
