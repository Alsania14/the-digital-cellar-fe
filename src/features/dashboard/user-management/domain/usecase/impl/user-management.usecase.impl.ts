import { inject, injectable } from 'inversify';
import { UserEntity } from '../../entities/UserEntity';
import { UserManagementUseCase } from '../user-management.usecase';
import type { UserManagementRemoteRepository } from '../../repository/user-management-remote.repository';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import { UserDto } from '../../dto/user.dto';
import { PaginationDto } from '@/src/shared/domain/dto/pagination.dto';
import { PaginationEntity } from '@/src/shared/domain/entities/pagination.entity';

@injectable()
export class UserManagementUseCaseImpl implements UserManagementUseCase {
  @inject(CONTAINER_TYPES.USER_MANAGEMENT_REPOSITORY)
  private readonly userManagementRemoteRepository!: UserManagementRemoteRepository;

  async get(paginationDto?: PaginationDto): Promise<PaginationEntity<UserEntity>> {
    return this.userManagementRemoteRepository.get(paginationDto);
  }

  async create(userDto: UserDto): Promise<void> {
    await this.userManagementRemoteRepository.create(userDto);
  }

  async update(id: number, userDto: UserDto): Promise<void> {
    await this.userManagementRemoteRepository.update(id, userDto);
  }

  async delete(id: number): Promise<void> {
    await this.userManagementRemoteRepository.delete(id);
  }
}
