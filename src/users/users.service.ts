import { Injectable } from '@nestjs/common';
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
    this.findOne(user.username).then((isExist) => {
      if (isExist) {
        return null;
      }
      const salt = genSaltSync(10);
      const hashPassword = hashSync(user.password, salt);
      const newUser = {
        username: user.username,
        password: hashPassword,
      }
      return this.usersRepository.insert(newUser);
    })
  }
}
