import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { EventsModule } from './events/events.module';
import { AudioModule } from './audio/audio.module';
import { RoomModule } from './room/room.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://metaphor:metaphor@metaphor.lgztn.mongodb.net',
      {
        dbName: 'metaphor',
      },
    ),
    UserModule,
    AuthModule,
    EventsModule,
    AudioModule,
    RoomModule,
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
