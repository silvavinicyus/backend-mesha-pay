import { Procedure } from '../entities/procedure.entity';

export class IInputFindByProcedureDto {
  column: keyof Pick<Procedure, 'name' | 'uuid' | 'id'>;
  value: string | number | boolean;
}
