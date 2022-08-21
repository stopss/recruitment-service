import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobPostingService } from 'src/job-posting/job-posting.service';
import { Repository } from 'typeorm';
import { ApplyEntity } from './apply.entity';
import { saveUserDto } from './dto/save.user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ApplyEntity)
    private applyRepository: Repository<ApplyEntity>,
    private readonly jobPostingService: JobPostingService,
  ) {
    this.userRepository = userRepository;
    this.applyRepository = applyRepository;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Not Found User ID');
    }
    return user;
  }

  // 유저 등록
  async saveUser(body: saveUserDto): Promise<any> {
    try {
      const user = await this.userRepository.save(body);
      const result = { ...user };
      return { message: 'Save Success', ...result };
    } catch (error) {
      return { error };
    }
  }

  // 채용 공고 지원
  async applyPost(userId: number, postId: number) {
    try {
      await this.findUserById(userId);

      await this.jobPostingService.findPostById(postId);

      await this.applyRepository.upsert(
        [{ userId, postId }],
        ['userId', 'postId'],
      );

      return { message: 'apply job-posting'};
    } catch (error) {
      return error;
    }
  }
}
