import { Procedure } from '../entities/procedure.entity';

export type InputCreateProcedureDto = Pick<
  Procedure,
  'name' | 'comission' | 'value'
>;
