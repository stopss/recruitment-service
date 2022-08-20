import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/company/company.entity';
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
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private readonly companyService: CompanyService,
  ) {
    this.jobPostingRepository = jobPostingRepository;
    this.companyRepository = companyRepository;
  }

  async findPostById(id: number) {
    const post = await this.jobPostingRepository.findOne({
      select: ['id', 'position', 'reward', 'content', 'stack'],
      where: { id: id },
    });

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
    try {
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
    } catch (error) {
      return error;
    }
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

  // 채용 공고 삭제
  async deletePost(id: number) {
    try {
      await this.findPostById(id);

      await this.jobPostingRepository.delete(id);

      return { message: 'Delete job-posting' };
    } catch (error) {
      return error;
    }
  }

  // 채용 공고 상세
  async detailPost(id: number) {
    try {
      const post = await this.findPostById(id);

      const company = await this.companyService.findCompanyById(post.companyId);

      const posts = await this.jobPostingRepository.find({
        where: { companyId: post.companyId },
      });

      const otherPosts = [];
      for (let i = 0; i < posts.length; i++) {
        if (post.id === posts[i].id) continue;
        otherPosts.push(posts[i].id);
      }

      const detail = {
        ...company,
        ...post,
        회사가올린다른채용공고: otherPosts,
      };

      return detail;
    } catch (error) {
      return error;
    }
  }

  // 채용 공고 검색
  async searchPost(keyword: string) {
    try {
      const posts = await this.jobPostingRepository
        .createQueryBuilder('Post')
        .select(['id', 'position', 'reward', 'stack', 'companyId'])
        .where('Post.stack LIKE :stack', { stack: `%${keyword}%` })
        .getRawMany();

      const searchList = [];

      if (posts.length !== 0) {
        for (let i = 0; i < posts.length; i++) {
          searchList.push({
            ...(await this.companyService.findCompanyById(posts[i].companyId)),
            ...posts[i],
          });
        }
        return searchList;
      } else {
        const companies = await this.companyRepository
          .createQueryBuilder('Company')
          .select(['id', 'company_name', 'country', 'region'])
          .where('Company.company_name LIKE :company_name', {
            company_name: `%${keyword}%`,
          })
          .getRawMany();

        if (companies.length !== 0) {
          for (let i = 0; i < companies.length; i++) {
            searchList.push({
              ...companies[i],
              ...(await this.jobPostingRepository.find({
                select: ['id', 'position', 'reward', 'stack'],
                where: { companyId: companies[i].id },
              })),
            });
          }
          return searchList;
        } else {
          return { message: '검색하신 채용목록은 없습니다.' };
        }
      }
    } catch (error) {
      return error;
    }
  }
}
