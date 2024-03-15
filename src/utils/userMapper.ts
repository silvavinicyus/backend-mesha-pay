import { User } from 'src/user/entities/user.entity';

export class UserMapper {
  static RemovePassword(user: User): Partial<User> {
    const newUser: Partial<User> = {
      created_at: user.created_at,
      name: user.name,
      email: user.email,
      id: user.id,
      type: user.type,
      updated_at: user.updated_at,
      uuid: user.uuid,
    };

    return newUser;
  }
}
