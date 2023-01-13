export interface UserAddress {
  id: number;
  street: string;
  numberr: string;
  zipCode: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
