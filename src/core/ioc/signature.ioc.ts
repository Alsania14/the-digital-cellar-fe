import 'reflect-metadata';

import { Container } from 'inversify';
import { AuthUseCase } from '@/src/features/auth/domain/usecase/auth.usecase';
import { CONTAINER_TYPES } from './signature-type.ioc';
import { AuthUseCaseImpl } from '@/src/features/auth/domain/usecase/impl/auth.usecase';
import { AuthRemoteRepository } from '@/src/features/auth/domain/repository/auth-remote.repository';
import { AuthRemoteRepositoryImpl } from '@/src/features/auth/data/repository/auth-remote.repository.impl';
import { TokenLocalRepository } from '@/src/shared/domain/repository/token-local.repository';
import { TokenLocalRepositoryImpl } from '@/src/shared/data/repository/token-local.repository';
import { UserManagementUseCase } from '@/src/features/dashboard/user-management/domain/usecase/user-management.usecase';
import { UserManagementUseCaseImpl } from '@/src/features/dashboard/user-management/domain/usecase/impl/user-management.usecase.impl';
import { UserManagementRemoteRepository } from '@/src/features/dashboard/user-management/domain/repository/user-management-remote.repository';
import { UserManagementRemoteRepositoryImpl } from '@/src/features/dashboard/user-management/data/repository/user-management-remote.repository.impl';

const SignatureContainer = new Container();

SignatureContainer.bind<AuthUseCase>(CONTAINER_TYPES.AUTH_USECASE)
  .to(AuthUseCaseImpl)
  .inSingletonScope();
SignatureContainer.bind<AuthRemoteRepository>(CONTAINER_TYPES.AUTH_REMOTE_REPOSITORY)
  .to(AuthRemoteRepositoryImpl)
  .inSingletonScope();
SignatureContainer.bind<TokenLocalRepository>(CONTAINER_TYPES.TOKEN_LOCAL_REPOSITORY)
  .to(TokenLocalRepositoryImpl)
  .inSingletonScope();

SignatureContainer.bind<UserManagementUseCase>(CONTAINER_TYPES.USER_MANAGEMENT_USECASE)
  .to(UserManagementUseCaseImpl)
  .inSingletonScope();
SignatureContainer.bind<UserManagementRemoteRepository>(CONTAINER_TYPES.USER_MANAGEMENT_REPOSITORY)
  .to(UserManagementRemoteRepositoryImpl)
  .inSingletonScope();

export { SignatureContainer };
