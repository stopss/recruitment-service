import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { createCompanyDto } from './dto/create.company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  createCompany(@Body() body: createCompanyDto): Promise<boolean> {
    return this.companyService.createCompany(body);
  }

  @Get(':id')
  findCompanyById(@Param('id') id: number) {
    return this.companyService.findCompanyById(id);
  }
}
