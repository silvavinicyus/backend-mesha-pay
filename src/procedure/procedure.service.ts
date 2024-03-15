import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IInputFindByProcedureDto } from './dtos/find.dto';
import { InputUpdateProcedureDto } from './dtos/update.dto';
import { Procedure } from './entities/procedure.entity';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Procedure)
    private procedureRepository: Repository<Procedure>,
  ) {}

  async create(
    props: Omit<Procedure, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Procedure> {
    const procedure = await this.procedureRepository.save(props);

    return procedure;
  }

  async findAll(): Promise<Procedure[]> {
    const procedures = await this.procedureRepository.find();

    return procedures;
  }

  async findBy(props: IInputFindByProcedureDto): Promise<Procedure | null> {
    const procedure = await this.procedureRepository.findOneBy({
      [props.column]: props.value,
    });

    return procedure;
  }

  async remove(id: number): Promise<void> {
    await this.procedureRepository.delete({ id });
  }

  async update(props: InputUpdateProcedureDto): Promise<void> {
    await this.procedureRepository.update({ id: props.id }, props.updateFields);
  }

  async findByIds(ids: number[]): Promise<Procedure[]> {
    const procedures = await this.procedureRepository.findBy({
      id: In(ids),
    });

    return procedures;
  }
}
