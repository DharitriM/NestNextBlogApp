import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from './Entity/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Posts])],
})
export class PostModule {}
