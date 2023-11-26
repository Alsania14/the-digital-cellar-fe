import { inject, injectable } from 'inversify';
import { UserEntity } from '../../entities/UserEntity';
import { UserManagementUseCase } from '../user-management.usecase';
import type { UserManagementRemoteRepository } from '../../repository/user-management-remote.repository';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';

@injectable()
export class UserManagementUseCaseImpl implements UserManagementUseCase {
  @inject(CONTAINER_TYPES.USER_MANAGEMENT_REPOSITORY)
  private readonly userManagementRemoteRepository!: UserManagementRemoteRepository;
  async get(): Promise<UserEntity[]> {
    return this.userManagementRemoteRepository.get();
  }
}
