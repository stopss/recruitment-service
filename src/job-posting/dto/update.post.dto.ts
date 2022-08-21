import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class updatePostDto {
  @ApiProperty({
    example: '백엔드, 프론트(수정)',
    description: '채용 포지션',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    example: '2000000(수정)',
    description: '채용 보상금',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reward: number;

  @ApiProperty({
    example: '풀스택 개발자를 모집합니다.(수정)',
    description: '채용 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 'Node.js, React(수정)',
    description: '사용기술',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  stack: string;
}
