import { UserEntity } from '../../domain/entities/UserEntity';
import { UsersModel } from '../models/users.model';

export class UsersModelMapper {
  static toDomain(data: UsersModel): UserEntity[] {
    return data.data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }));
  }
}
