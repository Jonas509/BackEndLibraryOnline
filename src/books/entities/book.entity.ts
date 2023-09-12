import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @Column('decimal', { precision: 5, scale: 2 }) // Exemple de colonne de prix au format décimal
  price: number;

  @Column({ nullable: true })
  coverImage: string; // URL ou chemin de l'image de couverture du livre
}
