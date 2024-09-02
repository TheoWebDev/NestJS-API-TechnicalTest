import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ChildrenService, UserService],
  controllers: [ChildrenController],
})
export class ChildrenModule {}
