/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, firstName, lastName, address } =
      createUserDto;

    // Vérifiez si l'adresse e-mail est déjà utilisée
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Adresse e-mail déjà utilisée.');
    }

    // Hachez le mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créez un nouvel utilisateur
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      address,
    });

    // Enregistrez l'utilisateur dans la base de données
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur #${id} non trouvé.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Mettez à jour les propriétés de l'utilisateur en fonction de updateUserDto
    // Assurez-vous de gérer les validations nécessaires ici

    const { username, password, email, firstName, lastName, address } =
      updateUserDto;

    // Vérifiez si l'adresse e-mail est déjà utilisée, mais seulement si l'e-mail a changé
    if (email && email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException('Adresse e-mail déjà utilisée.');
      }
    }

    // Hachez le mot de passe avant de le stocker, mais seulement si un nouveau mot de passe est fourni
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Mettez à jour les autres propriétés de l'utilisateur
    if (username) user.username = username;
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (address) user.address = address;

    // Enregistrez les modifications dans la base de données
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
