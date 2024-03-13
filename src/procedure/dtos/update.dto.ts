import { Procedure } from '../entities/procedure.entity';

export class InputUpdateProcedureDto {
  id: number;
  updateFields: Partial<Pick<Procedure, 'comission' | 'name' | 'value'>>;
}
