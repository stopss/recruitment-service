import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { JobPostingController } from './job-posting.controller';
import { JobPostingEntity } from './job-posting.entity';
import { JobPostingService } from './job-posting.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPostingEntity]), CompanyModule],
  controllers: [JobPostingController],
  providers: [JobPostingService]
})
export class JobPostingModule {}
