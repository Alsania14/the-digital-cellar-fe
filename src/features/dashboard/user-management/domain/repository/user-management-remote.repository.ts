import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/UserEntity';

export interface UserManagementRemoteRepository {
  get(): Promise<UserEntity[]>;
  create(userDto: UserDto): Promise<void>;
}
