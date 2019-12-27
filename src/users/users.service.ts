import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ username: username });;
  }

  async create(user: User) {
    const isExist = this.findOne(user.username);
    if (isExist) {
      return null;
    }

    return this.usersRepository.insert(user);
  }
}
