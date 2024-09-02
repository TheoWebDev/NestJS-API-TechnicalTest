import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Find user by Email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(id: number, email: string, username: string) {
    return this.prisma.user.update({
      where: { id },
      data: { email, username },
    });
  }

  async createUser(email: string, username: string) {
    return this.prisma.user.create({
      data: { email, username },
    });
  }
}
