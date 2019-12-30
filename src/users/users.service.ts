import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ username: username });;
  }

  async create(user: User) {
    const isExist = await this.findOne(user.username);
      if (isExist) {
        throw new UnauthorizedException('User already exist');
      }
      const salt = genSaltSync(10);
      const hashPassword = hashSync(user.password, salt);
      const newUser = {
        username: user.username,
        password: hashPassword,
      }
      return this.usersRepository.insert(newUser);
  }
}
