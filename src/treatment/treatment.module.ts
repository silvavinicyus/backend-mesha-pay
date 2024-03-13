import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { Treatment } from './entities/treatment.entity';
import { TreatmentProcedures } from './entities/treatment_procedures.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureModule } from 'src/procedure/procedure.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Treatment, TreatmentProcedures]),
    ProcedureModule,
  ],
  providers: [TreatmentService],
  controllers: [TreatmentController],
})
export class TreatmentModule {}
