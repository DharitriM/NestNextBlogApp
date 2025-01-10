import { IsNumber, IsString } from 'class-validator';

export class PostCreateDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  image: string;

  @IsNumber()
  author: number;
}
