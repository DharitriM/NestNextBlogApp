import { Injectable } from '@nestjs/common';
import { PostCreateDto } from './Dto/post.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './Entity/post.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
    private authService: AuthService,
  ) {}
  async getPosts() {
    const allPosts = await this.postRepository.find();
    return { message: 'All Posts', data: allPosts };
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) return { message: 'Post not found' };
    return { message: 'Post found', data: post };
  }

  async createPost(body: PostCreateDto) {
    const response = await this.postRepository.save(body)
    if (!response) {
      return { message: 'Post not created' };
    }
    return response;
  }

  async updatePost(id: number, body: PostCreateDto) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      return { message: 'Post not found' };
    } else {
      let updatedPost = {
        ...post,
        title: body.title,
        content: body.content,
        image: body.image,
        author: body.author,
      };
      this.postRepository.update(id, updatedPost);
      return { message: 'Post updated', data: updatedPost };
    }
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      return { message: 'Post not found' };
    } else {
      await this.postRepository.delete({ id });
      return { message: 'Post deleted' };
    }
  }

  async getPostsByCurrentUser(accessToken: string) {
    console.log('Access Token: in /post/user', accessToken);

    const user =
      await this.authService.getCurrentUserByAccessToken(accessToken);
    console.log('/post/user User:', user);

    if (!user ||  isNaN(Number(user.id))) {
      throw new Error('User not found or user ID is invalid');
    }
    const userId = Number(user.id);

    const posts = await this.postRepository.find({
      where: { author: userId },
    });
    console.log('Posts by current user:', posts);

    return { message: 'Posts by current user', data: posts };
  }

  async getPostsByUser(userId: number) {
    const posts = await this.postRepository.find({ where: { author: userId } });
    return { message: 'Posts by user', data: posts };
  }
}
