import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { savePostDto } from './dto/save.post.dto';
import { updatePostDto } from './dto/update.post.dto';
import { JobPostingService } from './job-posting.service';

@Controller('post')
export class JobPostingController {
  constructor(private readonly jobPostingsService: JobPostingService) {}

  @Get()
  getAllPost() {
    return this.jobPostingsService.getAllPost();
  }

  @Post()
  savePost(@Body() body: savePostDto): Promise<any> {
    return this.jobPostingsService.savePost(body);
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() body: updatePostDto) {
    return this.jobPostingsService.updatePost(id, body);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.jobPostingsService.deletePost(id);
  }
}
