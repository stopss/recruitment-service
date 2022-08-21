import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { createCompanyDto } from './dto/create.company.dto';

@Controller('company')
@ApiTags('회사 API')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({
    summary: '회사 등록 API',
    description: '회사 정보를 저장합니다.',
  })
  createCompany(@Body() body: createCompanyDto): Promise<any> {
    return this.companyService.createCompany(body);
  }

  @Get(':id')
  @ApiOperation({
    summary: '회사 정보 API',
    description: '회사 정보를 보여줍니다.',
  })
  findCompanyById(@Param('id') id: number) {
    return this.companyService.findCompanyById(id);
  }
}
