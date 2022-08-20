import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { createCompanyDto } from './dto/create.company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {
    this.companyRepository = companyRepository;
  }

  // 회사 찾기
  async findCompanyById(companyId: number) {
    const company = await this.companyRepository.findOne({
      select: ['id', 'company_name', 'country', 'region'],
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Not Found Company ID');
    }
    return company;
  }

  // 회사 등록하기
  async createCompany(body: createCompanyDto): Promise<any> {
    try {
      const company = await this.companyRepository.save(body);
      const result = { ...company };
      return { message: 'Create success', ...result };
    } catch (error) {
      return { error };
    }
  }
}
