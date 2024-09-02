import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
  Header,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ChildrenService } from './children.service';
import { AuthGuard } from 'src/guard/auth.guard';
import * as fastCsv from 'fast-csv';
import { Readable } from 'stream';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class ChildrenController {
  constructor(
    private readonly childrenService: ChildrenService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('child-care/:id/children')
  async getChildrenByNursery(@Param('id') nurseryId: string) {
    return this.childrenService.getChildrenByNursery(parseInt(nurseryId, 10));
  }

  @Get('children/export')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=children.csv')
  async exportChildren(
    @Res() res: Response,
    @Query('childCareId') childCareId?: number,
  ): Promise<void> {
    const queryOptions: any = {
      orderBy: {
        lastname: 'asc',
      },
      distinct: ['id'],
      select: {
        lastname: true,
        firstname: true,
      },
    };

    if (childCareId) {
      queryOptions.where = {
        nurseryId: Number(childCareId),
      };
    }

    const children = await this.prisma.children.findMany(queryOptions);
    // Create reading stream
    const readable = Readable.from(children);
    // Config flux for CSV
    const csvStream = fastCsv.format({ headers: true });
    // Send CSV in streaming
    readable.pipe(csvStream).pipe(res);
  }

  @UseGuards(AuthGuard)
  @Post('child')
  async createChildren(
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('createdBy') createdBy: number,
    @Body('nurseryId') nurseryId: number,
  ) {
    return this.childrenService.createChildren(
      firstname,
      lastname,
      createdBy,
      nurseryId,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('child/:nurseryId/child/:childId')
  async deleteChildAssignment(
    @Param('nurseryId') nurseryId: string,
    @Param('childId') childId: string,
    @Request() req: any,
  ) {
    const user = req.user;
    // parseInt id because bug send id to a String
    const nurseryIdInt = parseInt(nurseryId, 10);
    const childIdInt = parseInt(childId, 10);

    return this.childrenService.deleteChildAssignment(
      nurseryIdInt,
      childIdInt,
      user.id,
    );
  }
}
