import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { Repository } from 'typeorm';
import { savePostDto } from './dto/save.post.dto';
import { JobPostingEntity } from './job-posting.entity';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectRepository(JobPostingEntity)
    private jobPostingRepository: Repository<JobPostingEntity>,
    private readonly companyService: CompanyService,
  ) {
    this.jobPostingRepository = jobPostingRepository;
  }

  // 채용 공고 등록
  async savePost(body: savePostDto): Promise<any> {
    try {
      await this.companyService.findCompanyById(body.companyId);

      const post = await this.jobPostingRepository.save(body);
      const result = { ...post };
      return { message: 'Save Job-Postings', ...result };
    } catch (error) {
      return error;
    }
  }
}