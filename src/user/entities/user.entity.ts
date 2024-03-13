import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum IUserType {
  CLIENT = 'client',
  DOCTOR = 'doctor',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  type: IUserType;

  @Column()
  password: string;

  @Column({ default: false })
  isAttendant?: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
