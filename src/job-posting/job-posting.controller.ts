import { Body, Controller, Get, Post } from '@nestjs/common';
import { savePostDto } from './dto/save.post.dto';
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
}
