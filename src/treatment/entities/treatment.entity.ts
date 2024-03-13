import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TreatmentProcedures } from './treatment_procedures.entity';

export enum ITreatmentStatus {
  OPEN = 'OPEN',
  CLOSED = 'closed',
}

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  doctor_id: number;

  @Column()
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
}
