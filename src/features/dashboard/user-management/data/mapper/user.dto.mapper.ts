import { UserDto } from '../../domain/dto/user.dto';
import { UserRemoteDto } from '../dto/user-remote.dto';

export class UserDtoMapper {
  static toData(user: UserDto): UserRemoteDto {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
