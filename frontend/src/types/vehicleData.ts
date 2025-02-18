export type Condition = 'new' | 'used';

export type VehicleData = {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  purchasePrice: number,
  condition: Condition;
  available: boolean;
  addedAt: string;
};
