import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from './Entity/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [AuthModule, TypeOrmModule.forFeature([Posts])],
  exports: [PostService],
})
export class PostModule {}
