import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './Entity/user.entity';
import { UserDto } from './Dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: UserDto) {
    const isUserExists = await this.getUserByEmail(user.email);
    if (isUserExists) {
      throw new Error('User already exists');
    }
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, user: UserDto) {
    return await this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
