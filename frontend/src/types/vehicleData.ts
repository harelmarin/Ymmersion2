export type Condition = 'new' | 'used';

export type VehicleData = {
  id?: number;
  brand: string;
  model: string;
  version: string;
  color: string;
  vin: string;
  internalId: string;
  mileage: number;
  licensePlate: string;
  fees: number;
  price: number;
  purchasePrice: number;
  img: string;
  isRental: boolean;
  options: string[];
  condition: 'new' | 'used';
  available: boolean;
  addedAt: string;
};
