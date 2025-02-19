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
  img?: string;
  isRental: boolean;
  options: VehicleOption[];
  condition: Condition;
  available: boolean;
  addedAt?: string;
};

export type VehicleOption = {
  id?: number;
  name: string;
  vehicleId?: number;
};
