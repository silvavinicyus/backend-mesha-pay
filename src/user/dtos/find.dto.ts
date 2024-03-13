import { User } from '../entities/user.entity';

export class IInputFindByUserDto {
  column: keyof Pick<User, 'email' | 'uuid' | 'id'>;
  value: string | number | boolean;
}
