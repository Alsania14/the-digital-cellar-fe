import { PaginationDto } from '@/src/shared/domain/dto/pagination.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { PaginationEntity } from '@/src/shared/domain/entities/pagination.entity';
import { UserSummaryEntity } from '../entities/user-summary.entity';

export interface UserManagementUseCase {
  get(paginationDto?: PaginationDto): Promise<PaginationEntity<UserEntity>>;
  getSummary(): Promise<UserSummaryEntity>;
  create(userDto: UserDto): Promise<void>;
  update(id: number, userDto: UserDto): Promise<void>;
  delete(id: number): Promise<void>;
}
