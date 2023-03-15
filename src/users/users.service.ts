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
    return result;
  }
  findOne(id: number) {
    const results = this.userRepository.query(
      `SELECT * FROM Users WHERE id = '${id}'`,
    );
    console.log(results);
    return results;
  }
  find(email: string) {
    const results = this.userRepository.query(
      `SELECT * FROM Users WHERE email = '${email}'`,
    );
    return results;
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.userRepository.query(
      `SELECT * FROM Users WHERE id = ${id}`,
    );
    if (!user) {
      throw new Error('User Not Found.');
    }
    const email = attrs.email ? `'${attrs.email}'` : 'email';
    const password = attrs.password ? `'${attrs.password}'` : 'password';
    const query = `UPDATE Users SET email = ${email}, password = ${password} WHERE id = ${id}`;
    return this.userRepository.query(query);
  }

  async remove(id: number) {
    const user = await this.userRepository.query(
      `SELECT * FROM Users WHERE id = '${id}'`,
    );
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.query(`DELETE FROM Users WHERE id = ${id}`);
  }
}

// find(email: string){
//     return this.userRepository.query(`${email}`);
// }
//   async create(email: string, password: string): Promise<User> {
//     const user = new User();
//     user.email = email;
//     user.password = password;
//     return await this.userRepository.save(user);
//   }
