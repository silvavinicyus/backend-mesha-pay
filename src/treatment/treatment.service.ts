import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputCreateTreatmentRepository } from './dtos/create.dto';
import { ITreatmentStatus, Treatment } from './entities/treatment.entity';
import { TreatmentProcedures } from './entities/treatment_procedures.entity';
import { InputUpdateTreatmentDto } from './dtos/update.dto';
import { IInputFindByTreatmentDto } from './dtos/find.dto';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment)
    private treatmentRepository: Repository<Treatment>,
    @InjectRepository(TreatmentProcedures)
    private treatmentProcedureRepository: Repository<TreatmentProcedures>,
  ) {}

  async create(props: InputCreateTreatmentRepository): Promise<Treatment> {
    const treatment = await this.treatmentRepository.save({
      client_id: props.client_id,
      doctor_id: props.doctor_id,
      value: props.value,
      comission_value: props.comission,
      uuid: props.uuid,
    });

    const treatment_procedures_entities = props.treatment_procedures.map(
      (entity) => ({
        procedure_id: entity.procedure_id,
        comission_value: entity.comission_value,
        treatment_id: treatment.id,
      }),
    );

    await this.treatmentProcedureRepository.insert(
      treatment_procedures_entities,
    );

    return treatment;
  }

  async findAll(status: ITreatmentStatus): Promise<Treatment[]> {
    const procedures = await this.treatmentRepository.find({
      where: {
        status,
      },
      relations: {
        treatment_procedures: {
          procedure: true,
        },
      },
    });

    return procedures;
  }

  async update(props: InputUpdateTreatmentDto): Promise<Treatment> {
    await this.treatmentRepository.update(
      {
        id: props.id,
      },
      props.updateFields,
    );

    const treatment = await this.treatmentRepository.findOne({
      where: { id: props.id },
    });

    return treatment;
  }

  async findBy(props: IInputFindByTreatmentDto): Promise<Treatment | null> {
    const treatment = await this.treatmentRepository.findOne({
      where: { [props.column]: props.value },
    });

    return treatment;
  }
}
