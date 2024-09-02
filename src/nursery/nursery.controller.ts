import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ForbiddenException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NurseryService } from './nursery.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller()
export class NurseryController {
  constructor(private readonly nurseryService: NurseryService) {}

  @Get('child-cares')
  async getAllNursery() {
    return this.nurseryService.getAllNursery();
  }

  @Get('child-care/:id')
  async getNurseryById(@Param('id') id: string) {
    const nurseryId = parseInt(id, 10);
    return this.nurseryService.findNurseryById(nurseryId);
  }

  @UseGuards(AuthGuard)
  @Post('child-care')
  async createNursery(
    @Body('name') name: string,
    @Body('createdBy') createdBy: number,
  ) {
    return this.nurseryService.createNursery(name, createdBy);
  }

  @UseGuards(AuthGuard)
  @Delete('child-care/:id')
  async deleteNursery(@Param('id') id: string, @Request() req: any) {
    const nurseryId = parseInt(id, 10);
    const user = req.user;

    // Check if conversion to Int success
    if (isNaN(nurseryId)) {
      throw new ForbiddenException('Invalid ID format');
    }

    // Check if nursery exists and if user connected is authorized to delete it
    const nursery = await this.nurseryService.findNurseryById(nurseryId);
    if (!nursery || nursery.createdBy !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this nursery.',
      );
    }

    return this.nurseryService.deleteNursery(nurseryId, user.id);
  }
}
