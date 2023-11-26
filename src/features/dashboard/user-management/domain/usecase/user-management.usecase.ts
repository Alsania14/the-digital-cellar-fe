import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/UserEntity';

export interface UserManagementUseCase {
  get(): Promise<UserEntity[]>;
  create(userDto: UserDto): Promise<void>;
  update(id: number, userDto: UserDto): Promise<void>;
  delete(id: number): Promise<void>;
}
