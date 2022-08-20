import { Body, Controller, Param, Post } from '@nestjs/common';
import { saveUserDto } from './dto/save.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  saveUser(@Body() body: saveUserDto): Promise<any> {
    return this.userService.saveUser(body);
  }

  @Post('/apply/:userId/:postId')
  applyPost(@Param('userId') userId: number, @Param('postId') postId: number) {
    return this.userService.applyPost(userId, postId);
  }
}
