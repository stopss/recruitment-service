import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostingModule } from 'src/job-posting/job-posting.module';
import { ApplyEntity } from './apply.entity';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ApplyEntity]),
    JobPostingModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
