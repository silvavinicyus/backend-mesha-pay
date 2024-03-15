import { Treatment } from '../entities/treatment.entity';

export class InputUpdateTreatmentDto {
  id: number;
  updateFields: Partial<Pick<Treatment, 'duration' | 'status' | 'doctor_id'>>;
}
