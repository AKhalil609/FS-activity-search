import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [ActivitiesModule],
})
export class AppModule {}
