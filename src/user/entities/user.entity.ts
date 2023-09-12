import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: 'client' }) // Par défaut, un utilisateur est un client
  role: string;

  @Column({ nullable: true }) // Informations personnelles, facultatives
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  address: string;

  // Vous pouvez ajouter d'autres informations personnelles au besoin
}
