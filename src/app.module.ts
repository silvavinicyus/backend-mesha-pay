import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Procedure } from './procedure/entities/procedure.entity';
import { ProcedureModule } from './procedure/procedure.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { TreatmentModule } from './treatment/treatment.module';
import { Treatment } from './treatment/entities/treatment.entity';
import { TreatmentProcedures } from './treatment/entities/treatment_procedures.entity';

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
      entities: [User, Procedure, Treatment, TreatmentProcedures],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProcedureModule,
    TreatmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
