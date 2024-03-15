import { Treatment } from '../entities/treatment.entity';

export class IInputFindByTreatmentDto {
  column: keyof Pick<Treatment, 'uuid' | 'id'>;
  value: string | number | boolean;
}
