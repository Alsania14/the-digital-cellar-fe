import { injectable } from 'inversify';
import { UserManagementRemoteRepository } from '../../domain/repository/user-management-remote.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import {
  destroy,
  get,
  getSummary,
  patch,
  post,
} from '../data-source/user-management-remote.data-source';
import { UserPaginationModelMapper } from '../mapper/user-pagination.model.mapper';
import { UserDto } from '../../domain/dto/user.dto';
import { UserDtoMapper } from '../mapper/user.dto.mapper';
import { PaginationDto } from '@/src/shared/domain/dto/pagination.dto';
import { PaginationEntity } from '@/src/shared/domain/entities/pagination.entity';
import { UserSummaryEntity } from '../../domain/entities/user-summary.entity';
import { UserSummaryModelMapper } from '../mapper/user-summary.model.mapper';

@injectable()
export class UserManagementRemoteRepositoryImpl implements UserManagementRemoteRepository {
  async get(paginationDto?: PaginationDto): Promise<PaginationEntity<UserEntity>> {
    const paginationRemoteDto = UserPaginationModelMapper.toData(paginationDto);
    const model = await get(paginationRemoteDto);
    return UserPaginationModelMapper.toDomain(model);
  }

  async getSummary(): Promise<UserSummaryEntity> {
    const model = await getSummary();
    return UserSummaryModelMapper.toDomain(model);
  }

  async create(userDto: UserDto): Promise<void> {
    const userRemoteDto = UserDtoMapper.toData(userDto);
    await post(userRemoteDto);
  }

  async update(id: number, userDto: UserDto): Promise<void> {
    const userRemoteDto = UserDtoMapper.toData(userDto);
    await patch(id, userRemoteDto);
  }

  async delete(id: number): Promise<void> {
    await destroy(id);
  }
}
