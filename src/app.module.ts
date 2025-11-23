import { Module } from '@nestjs/common';
// @ts-ignore: temporary fix for "Module '@nestjs/config' has no exported member 'ConfigModule'"
// If possible, update @nestjs/config types or package to resolve this properly.
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
