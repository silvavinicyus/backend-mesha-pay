import { Module } from '@nestjs/common';
import { ProcedureService } from './procedure.service';
import { ProcedureController } from './procedure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from './entities/procedure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  providers: [ProcedureService],
  controllers: [ProcedureController],
  exports: [ProcedureService],
})
export class ProcedureModule {}
