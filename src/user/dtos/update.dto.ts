import { User } from '../entities/user.entity';

export class InputUpdateUserDto {
  id: number;
  updateFields: Partial<User>;
}
