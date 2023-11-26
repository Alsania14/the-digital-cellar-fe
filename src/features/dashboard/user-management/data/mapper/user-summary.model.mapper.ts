import { UserSummaryEntity } from '../../domain/entities/user-summary.entity';
import { UserSummaryModel } from '../models/user-summary.modal';

export class UserSummaryModelMapper {
  static toDomain(data: UserSummaryModel): UserSummaryEntity {
    return {
      userTotal: data.user_total,
      userTodayTotal: data.user_total_today,
    };
  }
}
