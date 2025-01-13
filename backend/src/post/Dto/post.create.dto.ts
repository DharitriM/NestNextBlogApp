import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  image: string;

  @IsNumber()
  author: number;
}
