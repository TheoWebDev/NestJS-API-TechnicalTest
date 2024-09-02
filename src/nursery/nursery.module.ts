import { Module } from '@nestjs/common';
import { NurseryService } from './nursery.service';
import { NurseryController } from './nursery.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule],
  providers: [NurseryService, UserService, PrismaService],
  controllers: [NurseryController],
})
export class NurseryModule {}
