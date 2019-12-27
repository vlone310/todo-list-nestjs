import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const expectedUser = await this.usersService.findOne(username);
    if (expectedUser && expectedUser.password === password) {
      const { password, ...result } = expectedUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
