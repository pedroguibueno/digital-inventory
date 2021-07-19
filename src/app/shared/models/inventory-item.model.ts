import { MeasurementUnit } from "./measurement-unit.model";

export interface InventoryItem {
    id?: number|null;
    name: string;
    measurementUnit: MeasurementUnit;
    quantity: number|null;
    price: number;
    isPerishable: boolean;
    expirationDate: Date|null;
    manufacturingDate: Date;
}