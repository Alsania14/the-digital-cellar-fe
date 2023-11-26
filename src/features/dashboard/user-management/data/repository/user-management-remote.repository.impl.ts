import { injectable } from 'inversify';
import { UserManagementRemoteRepository } from '../../domain/repository/user-management-remote.repository';
import { UserEntity } from '../../domain/entities/UserEntity';
import { get, post } from '../data-source/user-management-remote.data-source';
import { UsersModelMapper } from '../mapper/users.model.mapper';
import { UserDto } from '../../domain/dto/user.dto';
import { UserDtoMapper } from '../mapper/user.dto.mapper';

@injectable()
export class UserManagementRemoteRepositoryImpl implements UserManagementRemoteRepository {
  async get(): Promise<UserEntity[]> {
    const response = await get();
    const users = UsersModelMapper.toDomain(response);
    return users;
  }

  async create(userDto: UserDto): Promise<void> {
    const userRemoteDto = UserDtoMapper.toData(userDto);
    await post(userRemoteDto);
  }
}
