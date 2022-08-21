import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { CompanyModule } from './company/company.module';
import { JobPostingModule } from './job-posting/job-posting.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    CompanyModule,
    JobPostingModule,
    UserModule,
  ],
})
export class AppModule {}
