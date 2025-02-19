export type Transaction = {
  id: number;
  userId: number;
  vehicleId: number;
  employeeId: number;
  transactionType: "purchase" | "sale";
  amount: number;
  transactionDate: string;
  vehicle: {
    id: number;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    purchasePrice: number;
    condition: "new" | "used";
    available: boolean;
    addedAt: string;
  };
  employee: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: "employee" | "admin";
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string | null;
    gender?: "male" | "female" | "other" | null;
  };
  invoice?: {
    id: number;
    transactionId: number;
    invoiceNumber: string;
    details: string;
    totalAmount: number;
    invoiceDate: string;
  };
};
