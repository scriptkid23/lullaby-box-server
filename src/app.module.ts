import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://metaphor:metaphor@metaphor.lgztn.mongodb.net',
      {
        dbName: 'metaphor',
        useNewUrlParser: true,
      },
    ),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
