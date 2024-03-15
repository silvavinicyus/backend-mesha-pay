import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TreatmentProcedures } from './treatment_procedures.entity';

export enum ITreatmentStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true, unique: false })
  doctor_id: number;

  @Column({ unique: false })
  client_id: number;

  @Column({ nullable: true })
  duration: number;

  @Column({ type: 'float', nullable: true })
  value: number;

  @Column({ type: 'float', nullable: true })
  comission_value: number;

  @Column({ default: ITreatmentStatus.OPEN })
  status: ITreatmentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => TreatmentProcedures,
    (treatment_procedures) => treatment_procedures.treatment,
  )
  treatment_procedures: TreatmentProcedures[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;
}
