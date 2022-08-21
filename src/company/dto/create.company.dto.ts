import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createCompanyDto {
  @ApiProperty({ example: '원티드랩', description: '회사 이름', required: true })
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty({ example: '한국', description: '국가', required: true })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: '서울', description: '지역', required: true })
  @IsString()
  @IsNotEmpty()
  region: string;
}
