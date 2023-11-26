import { UserEntity } from '../entities/UserEntity';

export interface UserManagementUseCase {
  get(): Promise<UserEntity[]>;
}
