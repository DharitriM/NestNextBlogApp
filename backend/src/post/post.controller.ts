import { Posts } from './Entity/post.entity';
import { PostService } from './post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get('/:id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Body() post: Posts) {
    return await this.postService.createPost(post);
  }

  @Put('/:id')
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() post: Posts) {
    return await this.postService.updatePost(id, post);
  }

  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.deletePost(id);
  }
}
