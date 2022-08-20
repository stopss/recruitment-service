import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { Repository } from 'typeorm';
import { savePostDto } from './dto/save.post.dto';
import { updatePostDto } from './dto/update.post.dto';
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

  async findPostById(id: number) {
    const post = await this.jobPostingRepository.findOne({ where: { id: id } });

    if (!post) {
      throw new NotFoundException('Not Found job-posting ID');
    }
    return post;
  }

  // 채용 공고 등록
  async savePost(body: savePostDto): Promise<any> {
    try {
      await this.companyService.findCompanyById(body.companyId);

      const post = await this.jobPostingRepository.save(body);
      const result = { ...post };
      return { message: 'Save Job-Posting', ...result };
    } catch (error) {
      return error;
    }
  }

  // 채용 공고 전체 목록
  async getAllPost() {
    const posts = await this.jobPostingRepository.find({
      select: ['id', 'position', 'reward', 'stack'],
    });
    const allList = [];
    for (let i = 0; i < posts.length; i++) {
      allList.push({
        ...(await this.companyService.findCompanyById(posts[i].companyId)),
        ...posts[i],
      });
    }
    return allList;
  }

  // 채용 공고 수정
  async updatePost(id: number, body: updatePostDto) {
    try {
      await this.findPostById(id);

      await this.jobPostingRepository.update(id, body);
      const result = await this.findPostById(id);

      return { message: 'Update job-posting', ...result };
    } catch (error) {
      return error;
    }
  }
}
