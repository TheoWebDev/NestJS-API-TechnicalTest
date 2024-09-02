import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NurseryService {
  constructor(private prisma: PrismaService) {}

  // Function for simulate sent email
  private informStructureDeletion(userEmail: string): Promise<void> {
    const secondsToWait = Math.trunc(Math.random() * 7) + 1;
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(userEmail, 'informed!');
        resolve();
      }, secondsToWait * 1000);
    });
  }

  async getAllNursery() {
    return this.prisma.nursery.findMany();
  }

  async findNurseryById(id: number) {
    return this.prisma.nursery.findUnique({
      where: { id },
    });
  }

  async createNursery(name: string, createdBy: number) {
    return this.prisma.nursery.create({
      data: {
        name,
        createdBy,
      },
    });
  }

  async deleteNursery(id: number, userId: number) {
    const nursery = await this.prisma.nursery.findUnique({
      where: { id },
    });

    if (nursery && nursery.createdBy === userId) {
      const children = await this.prisma.children.findMany({
        where: {
          nurseryId: id,
        },
        select: {
          createdBy: true,
        },
      });

      const userIds = Array.from(
        new Set(children.map((child) => child.createdBy)),
      ).filter((creatorId) => creatorId !== userId);

      const usersToInform = await this.prisma.user.findMany({
        where: {
          id: { in: userIds },
        },
        select: { email: true },
      });

      const userEmails = usersToInform.map((user) => user.email);

      if (userEmails.length === 0) {
        await this.prisma.nursery.delete({
          where: { id },
        });
        return { message: 'Nursery successfully deleted, no users to notify.' };
      }

      for (let index = 0; index < userEmails.length; index += 3) {
        const batch = userEmails.slice(index, index + 3);
        await Promise.all(
          batch.map((email) => this.informStructureDeletion(email)),
        ).catch((error) => console.log('Error while informing users: ', error));
      }

      await this.prisma.nursery.delete({
        where: { id },
      });

      return { message: 'Nursery deleted and users notified successfully.' };
    } else {
      throw new ForbiddenException(
        'You are not allowed to delete this nursery.',
      );
    }
  }
}
