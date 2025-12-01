import { Module } from '@nestjs/common';

// @ts-ignore: temporary fix for "Module '@nestjs/config' has no exported member 'ConfigModule'"
// If possible, update @nestjs/config types or package to resolve this properly.
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth/auth.module';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
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

      ConfigModule.forRoot(
       {
        isGlobal : true 
      }
     ) , 

     MailerModule.forRoot({
      transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
      user: 'jafirislam10@gmail.com',
      pass: process.env.SMTP_PASSWORD
      },
      }
      }) , 

     TypeOrmModule.forRoot({
      type:'postgres' , 
      url: process.env.DATABASE_URL, 
      autoLoadEntities:true, 
      synchronize:true, 
     }), 
     StudentModule, AuthModule , OrganizerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
