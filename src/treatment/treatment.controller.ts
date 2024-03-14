import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { InputCreateTreatmentDto } from './dtos/create.dto';
import { Request } from 'express';
import { TreatmentService } from './treatment.service';
import { ProcedureService } from 'src/procedure/procedure.service';
import { v4 as uuidV4 } from 'uuid';
import { ITreatmentStatus, Treatment } from './entities/treatment.entity';

@Controller('treatments')
export class TreatmentController {
  constructor(
    private readonly treatmentService: TreatmentService,
    private readonly procedureService: ProcedureService,
  ) {}

  @Post()
  async create(
    @Body()
    props: Pick<InputCreateTreatmentDto, 'procedures' | 'doctor_id'>,
    @Req() req: Request,
  ) {
    const user_id = req['user']['sub'];

    const procedures_from_db = await this.procedureService.findByIds(
      props.procedures,
    );

    const procedures_calculed = procedures_from_db.map((procedure) => ({
      procedure_id: procedure.id,
      comission_value: procedure.comission * procedure.value,
    }));

    const total_treatment_value = procedures_from_db.reduce(
      (acc, next) => acc + next.value,
      0,
    );

    const total_treatment_comission = procedures_calculed.reduce(
      (acc, next) => acc + next.comission_value,
      0,
    );

    const treatment = await this.treatmentService.create({
      client_id: user_id,
      doctor_id: props.doctor_id,
      comission: total_treatment_comission,
      value: total_treatment_value,
      treatment_procedures: procedures_calculed,
      uuid: uuidV4(),
    });

    return treatment;
  }

  @Get('/open')
  async findOpen() {
    const treatments = await this.treatmentService.findAll(
      ITreatmentStatus.OPEN,
    );

    return treatments;
  }

  @Patch('/close/:uuid')
  async close(
    @Param(':uuid') uuid: string,
    @Body() props: Pick<Treatment, 'duration'>,
  ) {
    const treatment = await this.treatmentService.findBy({
      column: 'uuid',
      value: uuid,
    });

    if (!treatment) {
      throw new NotFoundException({
        Error: 'There is no treatment with this uuid!',
      });
    }

    if (treatment.status === ITreatmentStatus.CLOSED) {
      throw new ConflictException({
        Error: 'This treatment has already been closed',
      });
    }

    const treatmentUpdated = await this.treatmentService.update({
      id: treatment.id,
      updateFields: { ...props, status: ITreatmentStatus.CLOSED },
    });

    return treatmentUpdated;
  }
}
