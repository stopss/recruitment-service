import { Body, Controller, Post } from '@nestjs/common';
import { savePostDto } from './dto/save.post.dto';
import { JobPostingService } from './job-posting.service';

@Controller('post')
export class JobPostingController {
  constructor(private readonly jobPostingsService: JobPostingService) {}

  @Post()
  savePost(@Body() body: savePostDto): Promise<any> {
    return this.jobPostingsService.savePost(body);
  }
}
