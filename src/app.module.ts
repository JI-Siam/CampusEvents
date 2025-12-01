import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { OrganizerModule } from './organizer/organizer.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // to load .env file
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    AdminModule,
    StudentModule,
    OrganizerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
