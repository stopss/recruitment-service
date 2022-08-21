import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { saveUserDto } from './dto/save.user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('사용자 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '사용자 등록 API',
    description: '사용자 정보를 등록합니다.',
  })
  saveUser(@Body() body: saveUserDto): Promise<any> {
    return this.userService.saveUser(body);
  }

  @Post('/apply/:userId/:postId')
  @ApiOperation({
    summary: '채용지원 API',
    description: '사용자는 채용공고에 지원합니다.',
  })
  applyPost(@Param('userId') userId: number, @Param('postId') postId: number) {
    return this.userService.applyPost(userId, postId);
  }
}
