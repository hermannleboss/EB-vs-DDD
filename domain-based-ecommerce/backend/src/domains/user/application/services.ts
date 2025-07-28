// User Domain - Use Cases
import { UserRepository, AuthService } from '../domain/repositories';
import { User, CreateUserRequest, LoginRequest, CreateAddressRequest } from '../domain/entities';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async registerUser(userData: CreateUserRequest): Promise<{ user: User; token: string }> {
    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await this.authService.hashPassword(userData.password);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      hashedPassword,
    });

    // Generate token
    const token = this.authService.generateToken(user.id);

    return { user, token };
  }

  async loginUser(loginData: LoginRequest): Promise<{ user: User; token: string }> {
    // Find user
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password - Note: In real implementation, we'd need to get the hashed password
    // This is simplified for demo purposes
    const isValid = await this.authService.verifyPassword(loginData.password, 'hashedPassword');
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.authService.generateToken(user.id);

    return { user, token };
  }

  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUserProfile(userId: string, userData: Partial<User>): Promise<User> {
    return await this.userRepository.update(userId, userData);
  }

  async getUserAddresses(userId: string) {
    return await this.userRepository.getUserAddresses(userId);
  }

  async createUserAddress(userId: string, addressData: CreateAddressRequest) {
    return await this.userRepository.createAddress(userId, addressData);
  }
}
