// User Domain - Repository Interface
import { User, Address, CreateUserRequest, CreateAddressRequest } from './entities';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserRequest & { hashedPassword: string }): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User>;
  getUserAddresses(userId: string): Promise<Address[]>;
  createAddress(userId: string, addressData: CreateAddressRequest): Promise<Address>;
}

export interface AuthService {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
  generateToken(userId: string): string;
  verifyToken(token: string): { userId: string } | null;
}
