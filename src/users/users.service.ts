import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    const result = await this.userRepository.query(
      `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`,
    );
    return result[0];
  }
  
}