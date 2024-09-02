import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Put()
  async createOrUpdateUser(@Body() body: { email: string; username: string }) {
    const { email, username } = body;

    // Check if User exists
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      // PUT if exists
      return this.userService.updateUser(existingUser.id, email, username);
    } else {
      // Create if not exists
      return this.userService.createUser(email, username);
    }
  }
}
