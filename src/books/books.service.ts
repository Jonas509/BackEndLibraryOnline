import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new Book();
    newBook.title = createBookDto.title;
    newBook.author = createBookDto.author;
    newBook.genre = createBookDto.genre;
    newBook.price = createBookDto.price;
    newBook.coverImage = createBookDto.coverImage;

    return await this.bookRepository.save(newBook);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(
        `Le livre avec l'ID ${id} n'a pas été trouvé.`,
      );
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    // Recherchez le livre par son ID dans la base de données
    const book = await this.bookRepository.findOne({ where: { id } });

    // Vérifiez si le livre existe
    if (!book) {
      throw new NotFoundException(`Livre avec l'ID ${id} non trouvé.`);
    }

    // Appliquez les modifications du DTO à l'entité du livre
    if (updateBookDto.title) {
      book.title = updateBookDto.title;
    }
    if (updateBookDto.author) {
      book.author = updateBookDto.author;
    }
    if (updateBookDto.genre) {
      book.genre = updateBookDto.genre;
    }
    if (updateBookDto.price) {
      book.price = updateBookDto.price;
    }
    if (updateBookDto.coverImage) {
      book.coverImage = updateBookDto.coverImage;
    }

    // Sauvegardez les modifications dans la base de données
    await this.bookRepository.save(book);

    return book; // Renvoyez le livre mis à jour
  }

  async remove(id: number): Promise<void> {
    // Recherchez le livre par son ID dans la base de données
    const book = await this.bookRepository.findOne({ where: { id } });

    // Vérifiez si le livre existe
    if (!book) {
      throw new NotFoundException(`Livre avec l'ID ${id} non trouvé.`);
    }

    // Supprimez le livre de la base de données
    await this.bookRepository.remove(book);
  }
}
