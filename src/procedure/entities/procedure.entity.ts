import { TreatmentProcedures } from 'src/treatment/entities/treatment_procedures.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('procedures')
export class Procedure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  name: string;

  @Column()
  value: number;

  @Column({ type: 'float', nullable: false })
  comission: number;

  @Column()
  duration: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => TreatmentProcedures,
    (treatment_procedures) => treatment_procedures.procedure,
  )
  treatment_procedures?: TreatmentProcedures[];
}
