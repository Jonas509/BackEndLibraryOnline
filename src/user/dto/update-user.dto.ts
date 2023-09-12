import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(3, 20) // Longueur du nom d'utilisateur entre 3 et 20 caractères
  username: string;

  @IsString()
  @Length(6, 20) // Mot de passe entre 6 et 20 caractères
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional() // Les informations personnelles sont facultatives
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
