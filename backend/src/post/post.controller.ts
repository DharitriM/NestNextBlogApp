import { PostCreateDto } from './Dto/post.create.dto';
import { Posts } from './Entity/post.entity';
import { PostService } from './post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
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

  @Get('/details/:id') 
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.getPostById(id);
  }
  
  @Get('/current')
  async postByCurrentUser(@Headers('Authorization') authorization: string) {
    // Extract the access token from the Authorization header
    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing');
    }
    return await this.postService.getPostsByCurrentUser(token);
  }

  @Post()
  async createPost(@Body() post: PostCreateDto) {
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

  // @Get('/user/:id')
  // async postByUser(@Param('id', ParseIntPipe) id: number) {
  //   return await this.postService.getPostsByUser(id);
  // }
}
