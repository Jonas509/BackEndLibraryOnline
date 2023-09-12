import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDto {
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
