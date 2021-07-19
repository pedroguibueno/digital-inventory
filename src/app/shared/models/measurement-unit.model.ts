export enum MeasurementUnit {
    liter = "LITER",
    kilogram = "KILOGRAM",
    unit = "UNIT"
}

export interface MeasurementUnitDropdown {
    name: MeasurementUnit;
    translation: string;
    symbol: string;
}

export const measurementUnitOptions: MeasurementUnitDropdown[] = [
    {
        name: MeasurementUnit.liter,
        translation: "Litro",
        symbol: "lt"
    },
    {
        name: MeasurementUnit.kilogram,
        translation: "Quilograma",
        symbol: "kg"
    },
    {
        name: MeasurementUnit.unit,
        translation: "Unidade",
        symbol: "un"
    }
]