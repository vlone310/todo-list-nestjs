import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(user: User) {
    return this.usersRepository.insert(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ username: username });;
  }
}
