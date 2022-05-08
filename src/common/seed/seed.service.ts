import { Injectable } from '@nestjs/common';

import { generateUsers } from './seed-user.util';
import { UserService } from '../../user/user.service';

@Injectable()
export class SeedService {
  constructor(private readonly userService: UserService) {}

  async startDevelopmentSeed() {
    await this.seedUsers();
  }

  async seedUsers() {
    const users = [...generateUsers()];
    await Promise.all(
      users.map(async (user) => {
        await this.userService.addUser(user, false);
      }),
    );
  }
}
