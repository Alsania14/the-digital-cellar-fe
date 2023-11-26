import { PaginationEntity } from '@/src/shared/domain/entities/pagination.entity';
import { UserEntity } from '../../domain/entities/UserEntity';
import { UsersModel } from '../models/users.model';
import { PaginationRemoteDto } from '../dto/user-pagination-remote.dto';
import { PaginationDto } from '@/src/shared/domain/dto/pagination.dto';

export class UserPaginationModelMapper {
  static toDomain(data: UsersModel): PaginationEntity<UserEntity> {
    return {
      data: data.data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      })),
      links: data.links,
      meta: data.meta,
    };
  }

  static toData(data?: PaginationDto): PaginationRemoteDto | undefined {
    if (!data) return undefined;
    return {
      page: data.page,
      per_page: data.perPage,
      search: data.search,
    };
  }
}
