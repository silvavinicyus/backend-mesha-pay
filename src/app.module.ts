import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ProcedureModule } from './procedure/procedure.module';
import { Procedure } from './procedure/entities/procedure.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Procedure],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProcedureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
