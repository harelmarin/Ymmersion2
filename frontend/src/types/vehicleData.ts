export type VehicleData = {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  condition: Condition;
  available: boolean;
  addedAt: string;
};
export type Condition = 'new' | 'used' | 'damaged';
