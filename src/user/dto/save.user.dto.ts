import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class saveUserDto {
  @ApiProperty({
    example: '홍길동',
    description: '사용자 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@email.com',
    description: '사용자 이메일',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1234',
    description: '사용자 비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
