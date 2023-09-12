import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  genre: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  coverImage: string; // L'image de couverture est facultative
}
