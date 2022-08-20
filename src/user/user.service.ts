import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { saveUserDto } from './dto/save.user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    this.userRepository = userRepository;
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
}
