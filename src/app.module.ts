import { Module } from '@nestjs/common';
// @ts-ignore: temporary fix for "Module '@nestjs/config' has no exported member 'ConfigModule'"
// If possible, update @nestjs/config types or package to resolve this properly.
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
     ConfigModule.forRoot() , 
     TypeOrmModule.forRoot({
      type:'postgres' , 
      url: process.env.DATABASE_URL, 
      autoLoadEntities:true, 
      synchronize:true
     }), 
     StudentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
