import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { savePostDto } from './dto/save.post.dto';
import { updatePostDto } from './dto/update.post.dto';
import { JobPostingService } from './job-posting.service';

@Controller('posting')
@ApiTags('채용 공고 API')
export class JobPostingController {
  constructor(private readonly jobPostingsService: JobPostingService) {}

  @Get()
  @ApiOperation({
    summary: '채용 공고 목록 API',
    description: '채용 공고의 전체 목록을 보여줍니다.',
  })
  getAllPost() {
    return this.jobPostingsService.getAllPost();
  }

  @Get('/search')
  @ApiOperation({
    summary: '채용 공고 검색 API',
    description:
      '채용 공고를 검색합니다. { keyword는 사용기술(Node.js/Python 등), 회사 이름(워티드, 카카오 등)으로 검색합니다.}',
  })
  searchPost(@Query('keyword') keyword: string) {
    return this.jobPostingsService.searchPost(keyword);
  }

  @Post()
  @ApiOperation({
    summary: '채용 공고 추가 API',
    description: '채용 공고를 추가합니다.',
  })
  savePost(@Body() body: savePostDto): Promise<any> {
    return this.jobPostingsService.savePost(body);
  }

  @Put(':id')
  @ApiOperation({
    summary: '채용 공고 수정 API',
    description: '채용 공고를 수정합니다.',
  })
  updatePost(@Param('id') id: number, @Body() body: updatePostDto) {
    return this.jobPostingsService.updatePost(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '채용 공고 삭제 API',
    description: '채용 공고를 삭제합니다.',
  })
  deletePost(@Param('id') id: number) {
    return this.jobPostingsService.deletePost(id);
  }

  @ApiOperation({
    summary: '채용 공고 상세 API',
    description:
      '채용 공고를 상세 페이지를 보여줍니다.(채용 내용, 회사가 올린 다른 채용공고_id 포함)',
  })
  @Get(':id')
  detailPost(@Param('id') id: number) {
    return this.jobPostingsService.detailPost(id);
  }
}
