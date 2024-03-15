import { Procedure } from 'src/procedure/entities/procedure.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Treatment } from './treatment.entity';

@Entity('treatment_procedures')
export class TreatmentProcedures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  procedure_id: number;

  @Column({ nullable: false })
  treatment_id: number;

  @Column({ type: 'float', nullable: false })
  comission_value: number;

  @CreateDateColumn()
  created_at: number;

  @ManyToOne(() => Treatment, (treatment) => treatment.treatment_procedures)
  @JoinColumn({ name: 'treatment_id' })
  treatment: Treatment[];

  @ManyToOne(() => Procedure, (procedure) => procedure.treatment_procedures)
  @JoinColumn({ name: 'procedure_id' })
  procedure: Procedure[];
}
