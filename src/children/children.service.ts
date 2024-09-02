import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async getChildrenByNursery(nurseryId: number) {
    return this.prisma.children.findMany({
      where: { nurseryId },
    });
  }

  async createChildren(
    firstname: string,
    lastname: string,
    createdBy: number,
    nurseryId?: number,
  ) {
    return this.prisma.children.create({
      data: {
        firstname,
        lastname,
        createdBy,
        nurseryId,
      },
    });
  }

  async deleteChildAssignment(
    nurseryId: number,
    childId: number,
    userId: number,
  ) {
    const child = await this.prisma.children.findUnique({
      where: { id: childId },
    });

    if (!child) {
      throw new Error('Child not found !');
    }

    // Check if child was created by user making request
    if (child.createdBy !== userId) {
      throw new ForbiddenException('You are not allowed to delete this child.');
    }

    // Delete child assignment to his nursery
    await this.prisma.nursery.update({
      where: { id: nurseryId },
      data: {
        children: {
          disconnect: { id: childId },
        },
      },
    });

    // Check if child has another assignments
    const remainingAssignments = await this.prisma.children.count({
      where: {
        id: childId,
        nurseryId: {
          not: null,
        },
      },
    });

    // Delete child if no assignment
    if (remainingAssignments === 0) {
      await this.prisma.children.delete({
        where: { id: childId },
      });
      return {
        message: 'Child has been successfully deleted.',
      };
    }
    return {
      message: 'Child has been successfully disconnected from the nursery.',
    };
  }
}
