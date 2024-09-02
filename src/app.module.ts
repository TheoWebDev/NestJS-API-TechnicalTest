import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NurseryModule } from './nursery/nursery.module';
import { ChildrenModule } from './children/children.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, NurseryModule, ChildrenModule, PrismaModule],
})
export class AppModule {}
