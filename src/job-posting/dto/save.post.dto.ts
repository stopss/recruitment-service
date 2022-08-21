import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class savePostDto {
  @ApiProperty({ example: '1', description: '회사_id', required: true })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({
    example: '백엔드',
    description: '채용 포지션',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ example: 1000000, description: '채용 보상금', required: true })
  @IsString()
  @IsNotEmpty()
  reward: number;

  @ApiProperty({
    example: '원티드랩에서 백엔드 주니어 개발자를 채용합니다.',
    description: '채용 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 'Node.js', description: '사용기술', required: true })
  @IsString()
  @IsNotEmpty()
  stack: string;
}
