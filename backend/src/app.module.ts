import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [UsersModule, AdminModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
