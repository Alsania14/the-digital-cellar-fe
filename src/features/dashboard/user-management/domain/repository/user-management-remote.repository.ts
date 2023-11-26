import { UserEntity } from '../entities/UserEntity';

export interface UserManagementRemoteRepository {
  get(): Promise<UserEntity[]>;
}
